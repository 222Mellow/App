import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Image } from 'react-native';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebase';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsList = [];
      querySnapshot.forEach((doc) => {
        postsList.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsList);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      navigation.replace('Auth');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>QuickPost</Text>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
      <Button title="Create New Post" onPress={() => navigation.navigate('NewPost')} />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postItem}
            onPress={() => navigation.navigate('Post', { post: item })}
          >
            {item.images && item.images.length > 0 && (
              <Image source={{ uri: item.images[0] }} style={styles.postImage} />
            )}
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postPrice}>${item.price}</Text>
            <Text style={styles.postLocation}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  postItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postPrice: {
    fontSize: 16,
    color: 'green',
  },
  postLocation: {
    fontSize: 14,
    color: 'gray',
  },
  postImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
});