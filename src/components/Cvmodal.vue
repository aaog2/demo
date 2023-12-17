
<template>
    <div class="cvModal bg-light">
        <LoadingPage v-if="!employees"/>
        <SuccessModal class="modalfix"  v-if="successModal"/>
        <div v-if="errorMessage" class="errorMessage">
        <div class="error-message">
                <div class="modalss">
                    <img src="http://100dayscss.com/codepen/alert.png" width="44" height="38" />
                        <span class="title">ops !</span>
                        <p class="my-2">No Employee Data</p>
                        <button class="btn btn-danger" @click="errorMessage = null">Close</button>
                </div>
        </div>
        </div>
        <div class="cv">
           <div class="container"> 
                <div class="modalHeader text-center py-3">
                    <h3 class="">Worker Cv Details</h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('closeModal')">
                        <span aria-hidden="true"  class="text-dark">&times;</span>
                    </button>
                </div>

                {{ employees }}
                
            </div>
          </div>  
    </div>

                     
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { defineEmits,defineComponent } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import SuccessModal from './SuccessModal.vue';
import LoadingPage from '../components/LoadingPage.vue'
export default {
    props:["id"],
    components:{SuccessModal,LoadingPage},
    setup(props){
        let store = useStore();
        let family = ref();
        let passport = ref();
        let colorBlind = ref();
        let covid = ref();
        let englishSkill = ref();
        let mathSkill = ref();
        let canwait = ref();
        let familyForegin = ref();
        let workexpForegin = ref();
        let paid = ref();
        let errorMessage = ref();
        const imageInput = ref(null);
        let uploadedImage = ref('');
        let successModal = ref(false);

        console.log(props);

        //   get employee
        let getsingleEmployees = (id)=> store.dispatch('infoModule/getsingleEmployees',id);
            getsingleEmployees(props.id.id);

        let employees = computed(()=> {
              return store.state.infoModule.singleemployeesinfo
          })

          console.log(employees);

          let chgrejectstatus = async (id)=>{
           
            let data = {
                user_id:id,
                status:"failed"
            }

           try {
            let res = await axios.post('cv_result',data);
            console.log(res.data);
            employees.value.data.employee_info.cv_result = 'failed'
           } catch (error) {
                if(error.response){
                    errorMessage.value = error.response.data.message
                    console.log(error.response.data.message);
                }
           }

            
          }

          let chgacceptstatus =async (id)=>{
            
            let data = {
                user_id:id,
                status:"passed"
            }

            let res = await axios.post('cv_result',data);
            employees.value.data.employee_info.cv_result = 'passed'
            // emit('passed')

            console.log(res.data);
          }

          
          let chgpendingstatus =async (id)=>{
            
            let data = {
                user_id:id,
                status:"pending"
            }

            let res = await axios.post('cv_result',data);
            employees.value.data.employee_info.cv_result = 'pending'

            console.log(res.data);
          }

        //   photo upload
        let handleImageUpload =async ()=>{

            let file = imageInput.value.files[0];
            uploadedImage.value = URL.createObjectURL(file);
           
               try {
                console.log("hey");
                    let imgform = {
                        user_id:props.id.id,
                        photo: file
                    }
             console.log(imgform);

              let res =await axios.post(`cv/${props.id.id}?_method=patch`, imgform, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Accept': 'application/vnd.api+json'
                }
              });

              if(res){
                console.log(res.data);

              }
                } catch (error) {
                  if(error.response){
                        console.log("catch work")
                        // window.scrollTo(0,0);
                        errorMessage.value = error.response.data.message
                        console.log(error.response.data.message);
                    }
                }
        }

        let deleteCV=async(id)=>{
            try {
                let res = await axios.delete(`cv/${id}`)
                if(res){
                    console.log(res.data);
                    showSuccess()
                    setTimeout(()=>{
                        getsingleEmployees(props.id.id);
                        hideSuccess();
                    },2000)
                    
                    
                }
            } catch (error) {
                console.log("catch work")
                        // window.scrollTo(0,0);
                        errorMessage.value = error.response.data.message
                        console.log(error.response.data.message);
            }
        }

        let showSuccess = () => {
              successModal.value = true;
        };

        let hideSuccess = () => {
              successModal.value = false;
        };
          

        
          return{employees,family,passport,colorBlind,covid,englishSkill,mathSkill,chgrejectstatus,chgacceptstatus,chgpendingstatus,
                 canwait,familyForegin,workexpForegin,paid,errorMessage,handleImageUpload,imageInput,uploadedImage,
                 deleteCV, successModal,showSuccess,hideSuccess
        }
    }
}
</script>

<style>
.photo_upload_control {
    height: 250px;
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 10px;
    padding: 1rem;
    border-radius: 15px;
    background-color: #f5f5f5;

    position: relative;
  }

  .photo_upload_control label {
    font-size: 18px;
    font-weight: bold;
  }

  .photo_upload_control input[type="file"] {
    display: none;
  }

  .photo_upload_button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background-color: #0439DE;
    color: #fff;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  }

  .photo_upload_button:hover {
    background-color: #0000DD;
  }

  .photo_upload_button i {
    margin-right: 5px;
  }

  .image_input {
  display: none;
}
</style>