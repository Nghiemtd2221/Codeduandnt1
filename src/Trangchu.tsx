// src/Trangchu.js
import React, { useEffect, useState, useContext } from 'react';
import { Button, FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, View, Alert } from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CartContext } from './CartContext';
import GioHang from './Giohang';

const ListProduct = () => {
  const { addToCart } = useContext(CartContext); 
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http:// 192.168.1.54:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sản phẩm:', error);
      Alert.alert('Error', 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async () => {
    if (!productName || !productPrice || !productImage) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.64.105:3000/products', {
        name: productName,
        price: productPrice,
        image: productImage,
      });
      setProducts([...products, response.data]);
      setModalVisible(false);
      setProductName('');
      setProductPrice('');
      setProductImage('');
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://192.168.64.105:3000/products/${productId}`);
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.product}>
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
      <View style={styles.productTextContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} đ</Text>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => addToCart(item)}>
          <Text style={styles.buttonText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(item.id)}>
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.headerText}>Trang chủ</Text>
        <Text style={styles.headerText}>Sản phẩm</Text>
        <Text style={styles.headerText}>Liên hệ</Text>
        <Text style={styles.headerText}>Đăng nhập</Text>
      </View>
      <FlatList
        contentContainerStyle={styles.productContainer}
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
      <View style={styles.addButton}>
        <Button title="THÊM SP" onPress={() => setModalVisible(true)} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Nhập thông tin sản phẩm</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên sản phẩm"
              value={productName}
              onChangeText={setProductName}
            />
            <TextInput
              style={styles.input}
              placeholder="Giá sản phẩm"
              value={productPrice}
              onChangeText={setProductPrice}
            />
            <TextInput
              style={styles.input}
              placeholder="Link ảnh sản phẩm"
              value={productImage}
              onChangeText={setProductImage}
            />
            <View style={styles.buttonContainer}>
              <Button title="Thêm SP" onPress={addProduct} />
              <Button title="Hủy" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ListProduct;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: 'lightblue',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productContainer: {
    paddingHorizontal: 10,
  },
  product: {
    width: '45%',
    margin: '2.5%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  productImageContainer: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  productImage: {
    width: 100,
    height: 100,
  },
  productTextContainer: {
    padding: 10,
    alignItems: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  addButton: {
    margin: 10,
    alignSelf: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  addToCartButton: {
    backgroundColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
