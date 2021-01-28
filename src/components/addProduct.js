import React, { useState } from "react";
import { Button ,Card, Form} from "react-bootstrap"
import { db } from "../firebase";

const AddProduct = () => {
  const [URL, setURL] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("product")
      .add({
        URL: URL,
        name: name,
        price: price,
        category : category
      })
      .then(() => {
        alert("Your product has been added");
      })
      .catch((error) => {
        alert(error.message);
      });


    setURL("");
    setName("");
    setPrice("");
    setCategory("");
  };

  return (
    <Card>
        <Card.Body>
        <h2 className="text-center mb-4">Add Product</h2>

        <Form onSubmit={handleSubmit}>

          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>Select Category : </Form.Label>
            <Form.Control as="select" onChange={(e) => setCategory(e.target.value)} required>
              <option >--------------</option>
              <option default value="Category 1">Category 1</option>
              <option value="Category 2">Category 2</option>
              <option value="Category 3">Category 3</option>
            </Form.Control>
          </Form.Group>


            <Form.Group id="Image URL">
                <Form.Label>Image URL</Form.Label>
                <Form.Control placeholder="Image URL" value={URL} onChange={(e) => setURL(e.target.value)} type="text"  required />
            </Form.Group>

            <Form.Group id="Name">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} type="text"  required />
            </Form.Group>

            <Form.Group id="price">
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} type="number"  required />
            </Form.Group>
                <Button  className="w-100" type="submit">
            Add Product
            </Button>
        </Form>
        </Card.Body>
    </Card>
  );
};

export default AddProduct;