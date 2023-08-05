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
import { db, timestamp,storageRef,uploadBytes,storage } from '../firebase/config';
import useCollection from '@/composable/useCollection';
// import { storage } from '../firebase/config';
    export default{
        setup(){
            let nameDisplay = localStorage.getItem("useraccount");
            let message = ref('');
            let imageInput = ref(null);
            let {error, addDoc} = useCollection('messages');
           
            let handleSubmit =async () =>{
                // const file = imageInput.value.files[0];
                // console.log("file value =>", file)
                // // const storageRefs = storageRef(storage, 'UserImage/' + file.name);
                // console.log("Image Name=>", file.name);
                // uploadBytes(storageRef(storage, 'UserImage/' + file.name), file).then((snapshot) => {
                //     console.log('Uploaded successfully.');
                // });
                let chat = {
                    name:nameDisplay,
                    message:message.value,
                    created_at:timestamp()
                }  
                console.log("Chat Info =>", chat);
         
                await addDoc(chat);
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

    /* .image_input {
  display: none;
}

.plus_button{
    width: 45px;
  height: 45px;
  background-color: #007bff;
  color: #fff; 
  border-radius: 50%; 
  text-align: center;
  line-height: 40px; 
  cursor: pointer;
  margin-left: -15px;
} */

    textarea{
        color: #000;
        /* background-color: #7DC3FF; */
        background-color: #a7adba;
        width: 100%;
        max-width: 100%;
        margin-bottom: 6px;
        padding: 20px;
        box-sizing: border-box;
        border: 1px solid #999;
        border-radius: 12px;
        font-family: inherit;
        flex: 1;
        resize: none;
        line-height: 0.2;
    }

    
</style>