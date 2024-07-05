import React ,{useState,useRef,useEffect}from 'react'
import { v4 as uuidv4 } from 'uuid';

interface Message {
  id: string;
  content: string;
  timestamp: string;
}


const Websocket = () => {
    const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    // 创建 WebSocket 连接
    socket.current = new WebSocket('ws://localhost:8080');

    socket.current.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.current.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    socket.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  
  const handleSendMessage = () => {
    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      const message: Message = {
        id: uuidv4(),
        content: input,
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.current.send(JSON.stringify(message));
      setInput('');
    }
  };
  return (
    <div>Websocket</div>
  )
}

export default Websocket