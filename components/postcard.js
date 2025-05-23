import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PostCard = ({ post, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {post.images?.[0] && (
        <Image source={{ uri: post.images[0] }} style={styles.image} />
      )}
      <View style={styles.details}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.price}>${post.price || 'Free'}</Text>
        <Text style={styles.location}>{post.location}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  details: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    color: 'green',
    marginTop: 5,
  },
  location: {
    color: 'gray',
    marginTop: 5,
  },
});

export default PostCard;