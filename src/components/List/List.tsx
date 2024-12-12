import React from "react";
import { Col, Row } from "react-bootstrap";

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
    <Row>
      <section>
        <h2>{title}</h2>
        <Row>
          {items.map((item, index) => (
            <React.Fragment key={index}>{renderItem(item)}</React.Fragment>
          ))}
        </Row>
      </section>
    </Row>
  );
};

export default List;
