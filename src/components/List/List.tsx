import React from "react";
import { Card, Row } from "react-bootstrap";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title?: string;
}

const List = <T,>({
  items,
  renderItem,
  title,
}: ListProps<T>): React.ReactElement => {
  return (
    <Card className="p-0">
      <Card.Header>{title}</Card.Header>
      <Card.Body>
        <Row>
          {items.map((item, index) => (
            <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
          ))}
        </Row>
        {items.length === 0 && (
          <div className="text-center my-4">
            <i className="fas fa-inbox fa-3x"></i>
            <p className="mt-3">Nothing to display here!</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default List;
