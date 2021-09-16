import useMyCharacterList from 'hooks/useMyCharacterList';
import { Col, Row, Spinner } from 'react-bootstrap';
import CharacterItem from './CharacterItem';

export default function CharacherList() {
  const { list, loading } = useMyCharacterList();
  if (loading) {
    return (
      <div>
        <Spinner animation="border" size="sm" />
      </div>
    );
  }
  console.log('character list: ' + list);
  return (
    <div>
      <h4 className="mt-4 mb-4">Character NFT {list && <span>({list.length})</span>}</h4>
      <Row>
        {list &&
          list.map((item) => (
            <Col key={item} lg={4} sm={12} className="mb-2">
              <CharacterItem tokenId={item} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
