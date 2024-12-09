import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore'

export const useAdminUserStore = defineStore('admin-user', {
    state: () => ({
        list: [],
    }),
    actions: {
        async loadUsers() {
            const userCol = collection(db, "users");
            const userSnapshot = await getDocs(userCol);

            // console.log('userSnapshot',userSnapshot.docs)

            const userList = userSnapshot.docs.map(doc => {
                let convertedUser = doc.data()
                convertedUser.uid = doc.id
                //convert date time from firestore to javascript
                // convertedUser.updatedAt = convertedUser.updatedAt.toDate()
                convertedUser.updatedAt = convertedUser.updatedAt.toDate()
                return convertedUser
            })
            this.list = userList

            console.log('userList', userList)
        },
        async getUser(uid) {
            try {
                const userRef = doc(db, 'users', uid)
                const userSnapshot = await getDoc(userRef)
                return userSnapshot.data()
            } catch (error) {
                console.log('error', error)
            }
        },
        async updateUser(uid, userData) {
            try {
                //เราสามารถเลือกว่าอยากได้ข้อมูลอะไรบ้างไป update ไม่ต้องเอามาทั้งหมด
                const updateUser = {
                    fullname: userData.fullname,
                    status: userData.status,
                    role: userData.role,
                    updatedAt: new Date() //จริงๆแล้วควรแยก field ระหว่าง createdAt and UpdatedAt
                }
                const docRef = doc(db, 'users', uid)
                await setDoc(docRef, updateUser)
            } catch (error) {
                console.log('error', error)
            }

        }
    }
})