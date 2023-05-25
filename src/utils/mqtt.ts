import mqtt from 'mqtt/dist/mqtt'
// import mqtt from 'mqtt';


type MessageCallback = (topic: string, message: string) => void;

class MqttManager {
  private mqttClient: mqtt.MqttClient | null = null
  private topicCallbacks: Map<string, MessageCallback> = new Map()
  private isConnectedPromise: Promise<void> | null = null
  private isConnectedResolve: (() => void) | null = null

  constructor() {
  }

  connect() {
    // 连接MQTT
    const options = {
      clientId: `web-${Math.random()}`,
      username: 'pupu-api',
      password: 'QWEqwe123',
      clean: true
    }
    this.mqttClient = mqtt.connect('ws://localhost:8083/mqtt', options)

    this.isConnectedPromise = new Promise((resolve) => {
      this.isConnectedResolve = resolve
    })

    this.mqttClient.on('connect', () => {
      // 连接建立完成后，设置连接状态为true，并解析connectPromise
      // console.log('MQTT连接已建立');
      if (this.isConnectedResolve) {
        this.isConnectedResolve()
        this.isConnectedResolve = null
      }
    })

    // 监听连接断开事件
    this.mqttClient.on('close', () => {
      // console.log('MQTT连接已关闭');
    })

    // 监听错误事件
    this.mqttClient.on('error', (error) => {
      // console.log('MQTT连接错误', error);
    })

    // 监听消息事件
    this.mqttClient.on('message', (topic, message) => {
      // 处理接收到的消息
      // console.log(`接收到来自主题 ${topic} 的消息: ${message.toString()}`);
      this.handleMessage(topic, message)
    })
  }

  disconnect() {
    if (this.mqttClient) {
      this.mqttClient.end()
      this.mqttClient = null
      // console.log('MQTT连接已断开');
    }
  }

  isConnected(): boolean {
    return !!this.mqttClient && this.mqttClient.connected
  }

  async subscribeTopic(topic: string, callback: MessageCallback) {
    await this.isConnectedPromise // 等待连接建立完成

    if (this.mqttClient) {
      await this.mqttClient.subscribe(topic)
      this.topicCallbacks.set(topic, callback)
      // console.log(`订阅主题 ${topic}`);
    }
  }

  async unsubscribeTopic(topic: string) {
    await this.isConnectedPromise // 等待连接建立完成
    if (this.mqttClient) {
      await this.mqttClient.unsubscribe(topic)
      this.topicCallbacks.delete(topic)
      // console.log(`取消订阅主题 ${topic}`);
    }
  }

  private handleMessage(topic: string, message: Buffer) {
    const callback = this.topicCallbacks.get(topic)
    if (callback) {
      callback(topic, message.toString())
    }
  }


}

export default new MqttManager()
