import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebase';

export default function MessagesScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'posts'),
      where('userId', '==', auth.currentUser.uid)
    );
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const convos = [];
      querySnapshot.forEach((doc) => {
        convos.push({
          postId: doc.id,
          postTitle: doc.data().title,
        });
      });
      setConversations(convos);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Posts with Messages</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.postId}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() => navigation.navigate('Post', { post: item })}
          >
            <Text style={styles.postTitle}>{item.postTitle}</Text>
            <Text>View messages</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  conversationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});