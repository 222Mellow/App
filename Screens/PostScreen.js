import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, TouchableOpacity, TextInput, Button } from 'react-native';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebase';

export default function PostScreen({ route, navigation }) {
  const { post } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'posts', post.id, 'messages'),
      orderBy('timestamp', 'asc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesList = [];
      querySnapshot.forEach((doc) => {
        messagesList.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesList);
    });

    return () => unsubscribe();
  }, [post.id]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, 'posts', post.id, 'messages'), {
        text: message,
        senderId: auth.currentUser.uid,
        senderEmail: auth.currentUser.email,
        timestamp: serverTimestamp(),
      });
      setMessage('');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.price}>${post.price}</Text>
        <Text style={styles.location}>{post.location}</Text>
        
        {post.images && post.images.length > 0 && (
          <FlatList
            horizontal
            data={post.images}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
          />
        )}
        
        <Text style={styles.description}>{post.description}</Text>
        <Text style={styles.postedBy}>Posted by: {post.userEmail}</Text>
        
        <View style={styles.messagesContainer}>
          <Text style={styles.messagesTitle}>Messages:</Text>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageBubble,
                msg.senderId === auth.currentUser.uid
                  ? styles.sentMessage
                  : styles.receivedMessage,
              ]}
            >
              <Text>{msg.text}</Text>
              <Text style={styles.messageSender}>
                {msg.senderId === auth.currentUser.uid ? 'You' : msg.senderEmail}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 20,
    color: 'green',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 15,
  },
  image: {
    width: 300,
    height: 300,
    marginRight: 10,
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
  },
  postedBy: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  messagesContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  messagesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
  },
  messageSender: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
});