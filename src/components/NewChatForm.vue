<template>
    <form class="container col-lg-6 col-sm-4 d-flex">
        <!-- <div class="col-2">
            <label for="imageInput" class="plus-button plus_button">
            <font-awesome-icon icon="fa-solid fa-plus"  /> 
           
          </label>
          <input type="file" accept="image/jpeg, image/png, image/webp" class="btn btn-info image_input" id="imageInput" ref="imageInput" @change="handleImageUpload" />
        </div> -->
        <textarea class="col-9 chatBox" placeholder="Enter Message" v-model="message" @keypress.enter="handleSubmit"></textarea>
        <div class="col-1 mt-3 ms-2" @click="handleSubmit">
            <span class="sendIcon"><font-awesome-icon icon="fa-solid fa-paper-plane" /></span>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { db, timestamp } from '../firebase/config';
// import useCollection from '@/composable/useCollection';
// import { storage } from '../firebase/config';
    export default{
        setup(){
            let nameDisplay = localStorage.getItem("useraccount");
            let message = ref('');
            // let imageInput = ref(null);
            // let {error, addDoc} = useCollection('messages');
           
            let handleSubmit =async () =>{
               
                let chat = {
                    name:nameDisplay,
                    message:message.value,
                    // created_at:timestamp()
                    
                }  
                console.log("Chat Info =>", chat);
         
                // await addDoc(chat);
                const chatRef = db.collection('chats').doc(nameDisplay);
                chatRef.get()
                .then((doc)=>{
                    if(doc.exists){
                        const existingMessages = doc.data().messages || [];
                        existingMessages.push(chat);
                        
                        return chatRef.update({
                            messages:existingMessages
                        });
                    }else{
                            return chatRef.set({
                            messages: [chat]
                        });
                    }
                    console.log("Document Successfully Written");
                })
                .then(()=>{
                    console.log("Messages Update to doc");
                })
                .catch((error)=>{
                    console.log("Error occur", error);
                })
               message.value ='';
            }

            return{
                message,
                // imageInput,
                handleSubmit
            }
        }
    }
</script>

<style scoped>
    .container{
        /* width: 300px; */
        /* margin: auto; */
        bottom: 1rem;
        position: fixed;
        left: 50%;
        transform: translate(-50%);
    }

    .sendIcon{
        /* margin-top: 0.5rem; */
        font-size: 18px;
        padding: 10px 12px;
        background-color: #007bff;
        color: #fff;
        border-radius: 6px;
    }


    textarea{
        color: #000;
        /* background-color: #7DC3FF; */
        background-color: #a7adba;
        width: 100%;
        height: 6rem;
        max-width: 100%;
        margin-bottom: 6px;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #999;
        border-radius: 12px;
        font-family: inherit;
        flex: 1;
        resize: none;
        line-height: 1;
    }

    
</style>