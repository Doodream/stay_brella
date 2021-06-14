import React from "react";
import "antd/dist/antd.css";
import ProductCard from "components/ProductCard/ProductCard";
import { Card } from "antd";

const { Meta } = Card;

export default function Goods(props) {
  return (
    <ProductCard
      href={{
        pathname: "/product/detail/[id]",
        query: { data: JSON.stringify(props) },
      }}
      as={`/product/detail/${props.id}`}
      style={{ width: 240, height: 360, margin: "1rem" }}
      cover={
        <img
          width="240px"
          height="240px"
          src={props.imagePath}
          alt="배경이미지"
        ></img>
      }
    >
      <Meta title={props.title} description={props.description} />
    </ProductCard>
  );
}
