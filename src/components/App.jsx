import React, { Component } from "react";
import { fetchImagesWithQuery } from './Api/api'
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Error } from "./Error/Error";
import Modal from "./Modal/Modal";

const INITIAL_STATE = {
  data: null,
  page: 1,
  baseInputValue: '',

  isLoading: false,
  error: null,

  isOpenModal: false,
  modalData: null,
  textImage: null,
};

export class App extends Component {
  state = { ...INITIAL_STATE };

  async fetchData() {
    const { baseInputValue, page } = this.state;
    try {
      this.setState({ isLoading: true, });
      const data = await fetchImagesWithQuery(baseInputValue, page);
      this.setState((prevState) => ({
        data: prevState.data ? prevState.data.concat(data) : data,
        page: prevState.page + 1,
      }));
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { baseInputValue } = this.state;
    const checkBeforeRequest = baseInputValue !== prevState.baseInputValue && baseInputValue !== INITIAL_STATE.baseInputValue;

    if (checkBeforeRequest) {
      this.setState({ data: null, page: 1 }, () => {
        this.fetchData();
      });
    }
  }

  handleSubmit = query => {
    const baseInputValue = query.trim();
    this.setState({ baseInputValue });
  };

  handleLoadMore = () => {
    this.fetchData();
  };

  openModal = ({ largeImageURL, tags }) => {
    this.setState({
      isOpenModal: true,
      modalData: largeImageURL,
      textImage: tags,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      modalData: null,
    });
  };

  render() {
    const { data, isLoading, error, isOpenModal, modalData, textImage } = this.state;

    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSubmit} />
        {error !== null && (
          <Error error={error} />
        )}
        {isLoading && <Loader />}
        {data && <ImageGallery data={data} openModal={this.openModal}/>}
        {data && data.length > 11 && (
          <Button onClick={this.handleLoadMore}>Load More</Button>
        )}
        {isOpenModal && (
          <Modal closeModal={this.closeModal} modalData={modalData} textImage={textImage} />
        )}
      </div>
    )
  }
}

