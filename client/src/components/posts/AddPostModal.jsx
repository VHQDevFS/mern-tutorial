import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { PostContext } from '../../contexts/PostContext';

const AddPostModal = () => {
  // context
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);

  // state
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    url: '',
    state: 'TO LEARN',
  });

  const { title, description, url } = newPost;

  const onChangeNewPostForm = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewPost({ ...newPost, [name]: value });
    // console.log(newPost)
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPostData()
    setShowToast({show: true,   message, type: success ? 'success' : 'danger'})
    
  };

  const resetAddPostData = () => {
    setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' });
    setShowAddPostModal(false);
  }

  return (
    <Modal show={showAddPostModal} onHide={resetAddPostData}>
      <Modal.Header closeButton={resetAddPostData}>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              row={3}
              placeholder="Description"
              name="description"
              required
              style={{ marginBottom: '20px' }}
              value={description}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Enter Url"
              name="url"
              required
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetAddPostData}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Learn It
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
