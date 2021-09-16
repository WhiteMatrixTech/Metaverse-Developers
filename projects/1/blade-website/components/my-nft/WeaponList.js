import useMyWeaponList from 'hooks/useMyWeaponList';
import { Col, Row, Spinner } from 'react-bootstrap';
import WeaponItem from './WeaponItem';

export default function WeaponList() {
  const { list, loading } = useMyWeaponList();

  if (loading) {
    return (
      <div>
        <Spinner animation="border" size="sm" />
      </div>
    );
  }
  console.log('weapon list: ' + list);
  return (
    <div>
      <h4 className="mt-4 mb-4">Weapon NFT {list && <span>({list.length})</span>}</h4>
      <Row>
        {list &&
          list.map((item) => (
            <Col key={item} lg={4} sm={12} className="mb-2">
              <WeaponItem tokenId={item} />
            </Col>
          ))}
      </Row>
    </div>
  );
}
