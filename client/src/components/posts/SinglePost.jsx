import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import ActionButtons from './ActionButtons';

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  const myStyle = {
    color: 'white',
    backgroundColor:
      status === 'LEARNED'
        ? '#FF7851'
        : status === 'LEARNING'
        ? '#6CC3D5'
        : '#FFCE67',
  };

  return (
    <Card
      className="shadow"
      border={
        status === 'LEARNED'
          ? 'dark'
          : status === 'LEARNING'
          ? 'warning'
          : 'danger'
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                variant={
                  status === 'LEARNED'
                    ? 'dark'
                    : status === 'LEARNING'
                    ? 'warning'
                    : 'danger'
                }
                style={myStyle}
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-right">
              <ActionButtons url={url} _id={_id}/>
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default SinglePost;
