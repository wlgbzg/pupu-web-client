// import Dexie from 'dexie';
// import type { Message } from "@/types/beans";
//
// class MessageDB {
//     private db: Dexie;
//     messages: Dexie.Table<Message, string>;
//
//     constructor() {
//         this.db = new Dexie('MessageDB');
//         this.db.version(1).stores({
//             messages: 'id, from, channelId, type, time, body, user',
//         });
//         this.messages = this.db.table('messages');
//         this.db.messages.hook('creating', (primaryKey, newMessage) => {
//             return this.db.messages.where('id').equals(primaryKey).count().then((count) => {
//                 if (count > 0) {
//                     throw new Error(`Message with id '${primaryKey}' already exists.`);
//                 }
//                 return newMessage;
//             });
//         });
//     }
//
//     // 添加消息
//     addMessage(message: Message) {
//         return this.messages.add(message);
//     }
//
//     // 添加消息
//     addMessages(messages: Message[]) {
//         for (const message of messages) {
//             this.messages.add(message);
//         }
//     }
//
//     // 更新消息
//     updateMessage(id: string, updates: Partial<Message>) {
//         return this.messages.update(id, updates);
//     }
//
//     // 删除消息
//     deleteMessage(id: string) {
//         return this.messages.delete(id);
//     }
//
//     // 获取单个消息
//     getMessage(id: string) {
//         return this.messages.get(id);
//     }
//
//     // 获取所有消息
//     getAllMessages() {
//         return this.messages.toArray();
//     }
//
//     // 根据条件查询消息
//     queryMessages(condition: Dexie.FilterFunction<Message>) {
//         return this.messages.where(condition).toArray();
//     }
//
//     // 获取指定数量的按时间倒序的消息列表
//     getLatestMessages(count: number) {
//         return this.messages.orderBy('time').reverse().limit(count).toArray();
//     }
//
//     // 获取指定数量的按时间正序的消息列表
//     getOldestMessages(count: number) {
//         return this.messages.orderBy('time').limit(count).toArray();
//     }
// }
//
// export default MessageDB;
