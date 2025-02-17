import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert 
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductFormScreen = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price.toString());
    }
  }, [product]);

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem('token');
    const productData = { name, description, price: parseFloat(price) };
    try {
      if (product) {
        await axios.put(
          `http://localhost:3000/products/${product.id}`, 
          productData, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Alert.alert('Success', 'Product updated');
      } else {
        await axios.post(
          'http://localhost:3000/products', 
          productData, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        Alert.alert('Success', 'Product created');
      }
        setName('');
        setDescription('');
        setPrice('');
        navigation.setParams({ product: null });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to save product');
    }
  };

  const handleNew = () => {
    setName('');
    setDescription('');
    setPrice('');
    navigation.setParams({ product: null });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
      />
      <Text style={styles.label}>Description</Text>
      <TextInput 
        style={styles.input} 
        value={description} 
        onChangeText={setDescription} 
      />
      <Text style={styles.label}>Price</Text>
      <TextInput 
        style={styles.input} 
        value={price} 
        onChangeText={setPrice} 
        keyboardType="numeric" 
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{product ? 'Update' : 'Create'}</Text>
      </TouchableOpacity>
      {product ? (
        <TouchableOpacity style={styles.newButton} onPress={handleNew}>
          <Text style={styles.buttonText}>New</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  newButton: {
    backgroundColor: '#17a2b8',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductFormScreen;