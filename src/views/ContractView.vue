<template>
  <div class="bg-light mains" :class="bgactive === true ? 'red' : 'blue'" >
        <Navbar/>
        <LoadingPage v-if="!employees"/>
        <SideNavbar></SideNavbar>
        <Contractmodal v-if="showModal" :id="userid" @closeModal="hidemodal"></Contractmodal>
        <Filemodal  class="success" v-if="fileModal" :id="contractid" @closeModal="hidemodal"></Filemodal>
        <SuccessModal class="success"  v-if="successModal"/>
        <!-- alert -->
        <div v-if="errorMessage" class="errorMessage">

            <div class="error-message">
                <div class="modalss">
                    <img src="http://100dayscss.com/codepen/alert.png" width="44" height="38" />
                        <span class="title">ops !</span>
                        <p class="my-2">{{ errorMessage }}</p>
                        <button class="btn btn-danger" @click="errorMessage= null">Close</button>
                </div>
            </div>
        </div>
        <!-- form -->
        <div class="page">
            <div class="containers py-4">
                <h4 class="py-2">Contract Upload</h4>
                <!-- Input Container -->
                <div class="row col-12 col-lg-10 mt-4">
                    <!-- DOE Number -->
                    <div class="col-4">
                        <label for="doenum">DOE Number</label>
                            <select class="form-select bg-light" id="doenum" v-model="doeId" @change="getdoeId(doeId)">
                                <option v-for="doe in does" :key="doe.id" :value="doe.doe_id">{{ doe.doe_id }}</option>     
                            </select>
                    </div>
                    <!-- Contract Place -->
                    <div class="form-group col-4">
                        <label for="place">Contract Place</label>
                        <input type="text" class="form-control bg-light" id="place" v-model="contractPlace">
                    </div>
                    <!-- Contract Date -->
                    <div class="form-group col-4">
                            <label for="contractDate" class="d-block">Contract Date</label>
                            <div class="dateContainer form-control">
                                    <input type="text" maxlength="2" class="datecss" v-model="day">
                                    <span>/</span>
                                    <input type="text" maxlength="2" class="datecss" v-model="month">
                                    <span>/</span>
                                    <input type="text" maxlength="4" class="datecss" v-model="year">
                                </div>
                    </div>
                </div>   
                <!-- Button Container -->
                <div class="btn-containers pt-4">
                    <button class="mx-4 shadow-sm clearbutton " @click="clearData"><span class="button-content pe-1">Clear All </span><span class="button-icon"><font-awesome-icon icon="fa-solid fa-trash"  /></span></button>
                    <button class="button" @click="handleSubmit"><span class="button-content">Register </span></button>
                </div>
            </div>
        </div>
        <!-- table -->
        <div class="page">
            <div class="containers">
                    <!-- title -->
                    <h4 class="py-4">Workers Information</h4>
                    <!-- DOE Table-->
                    <table class="table table-striped">
                        <thead>
                            <tr>
                            <th>
                                <input type="checkbox" v-model="allEmployees" @change="selectedallEmployee">
                            </th>
                            <th scope="col">No</th>
                            <th scope="col">Worker ID</th>
                            <th scope="col">Name(En)</th>
                            <th scope="col">NRC Number</th>
                            <!-- <th scope="col">Passport</th> -->
                            <th scope="col">PDF Files</th>
                            <th scope="col">Detail</th>
                            </tr>
                        </thead>
                        <tbody v-for="(employees,index) in fillterEmployees" :key="employees.id">
                            <tr>
                            <td>
                                <input type="checkbox" v-model="selectedEmployees" :value="employees.user_id" @change="selectNum">
                            </td>
                            <th scope="row">{{ index + 1 }}</th>
                                <td>{{ employees.user.employee_id }}</td>
                                <td>{{ employees.name_en }}</td>
                                <td>{{employees.nrc }}</td>
                                <td v-if="employees.contract_upload && !edit ">
                                    <button v-if="!employees.contract_upload.pdf" class="btn btn-primary" @click="showFile(employees.contract_upload.id)">Upload File</button>  
                                    <button v-else-if="employees.contract_upload.pdf"  class="btn btn-success" @click.left="getfile(employees.contract_upload.pdf)" @click.right="edit = !edit">Get File</button> 
                                </td>
                                <td v-else-if="employees.contract_upload && edit ">
                                    <button v-if="employees.contract_upload.pdf" class="btn btn-warning" @click.leftt="showFile(employees.contract_upload.id)"  @click.right="edit = !edit">Update File</button>   
                                </td>
                                <td v-else class="text-danger">No Data</td>
                                <td><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" @click="showmodal(employees.user_id)" /></td>
                                <td v-if="employees.contract_upload"><button class="btn btn-outline-danger" @click="deleteContract(employees.contract_upload.id)"><font-awesome-icon icon="fa-solid fa-trash" /></button></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
  </div>
</template>

<script>
import { computed, ref,onMounted } from 'vue';
import { useStore } from 'vuex';
import LoadingPage from '../components/LoadingPage.vue'
import axios from "axios";
import Navbar from '../components/Navbar.vue'
import SideNavbar from '../components/SideNavbar.vue'
import Contractmodal from '../components/Contractmodal.vue';
import SuccessModal from '../components/SuccessModal.vue';
import Filemodal from '../components/FileUploadmodal.vue';
import { useRouter } from 'vue-router';import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
export default {
    components:{Navbar,SideNavbar,Contractmodal,Filemodal,SuccessModal,LoadingPage},
    setup(){
        let store = useStore();
        let router =useRouter();
        let showModal = ref(false);
        let fileModal = ref(false)
        let successModal = ref(false);
        let errorMessage = ref(null);
        let edit = ref(false);

        let doeId=ref();
        let employees = ref();
        let contractPlace = ref();
        let contractDate = ref();
        let trainingDate = ref();
        let depatureDate = ref();
        let fillterEmployees = ref();
        let allEmployees = ref(false);
        let selectedEmployees = ref([]);
        let userid = ref();
        let contractid=ref();
        let file = ref();
        let bgactive = ref(false);

        let day = ref();
        let month = ref();
        let year = ref();

        // get DOE Data
        let does = computed(()=>{
            return store.state.doeModule.does
        })


        let getData = ()=> store.dispatch('doeModule/getDoes');
        getData();

         // get All Employees Data


         let getemployees = async()=>{
            try {
                let res = await axios.get("employee_infos")
                console.log(res.data);
                employees.value = res
           } catch (error) {
            if(error.response){
                errorMessage.value = error.response.data.message
                console.log(error.response.data.message);
            }
           }
         }

        // console.log(employees.value.data);
        onMounted(()=>{
          getemployees()
        })

        let getdoeId =(id)=>{
            console.log("hey work",employees.value);
            fillterEmployees.value = employees.value.data.filter((employee)=>{
                if(employee.doe !== null){
                    return employee.doe.doe_id == id
                }
                // console.log(employee.doe);
            })

            // console.log("fillterEmployees",fillterEmployees.value[0].contrat_upload_data);
        }

        // selected Function
        let selectedallEmployee =()=>{
            if(allEmployees.value == true){
                selectedEmployees.value=[];
                console.log(fillterEmployees.value);
                fillterEmployees.value.forEach((allemployee,index)=>{
                    selectedEmployees.value.push(allemployee.user_id)
                })

                console.log(selectedEmployees.value);
            }else{
                selectedEmployees.value = [];
            }
        }


    let handleSubmit = async ()=>{
        contractDate.value = `${day.value}-${month.value}-${year.value}`

        let data = {
            userIds:selectedEmployees.value,
            contract_place:contractPlace.value,
            contract_date:contractDate.value,
        }

        console.log(data);
        try {
            let res = await axios.post('contract_upload',data);
            if(res){
                console.log(res.data.message);
                getemployees();
                showSuccess();
                setTimeout(()=>{
                    getdoeId(doeId.value)
                    hideSuccess();
                    contractPlace.value = "";
                    contractDate.value = "";
                },2000)
            }
        } catch (error) {
            if(error.response){
                errorMessage.value = error.response.data.message
                console.log(error.response.data.message);
            }
        }
        
    }    


    let uploadFile=(event)=>{
        file.value = event.target.files[0]
        console.log(file.value);
    }
        
        // modal function
        let showmodal = (id) => {
            userid.value = id;
            showModal.value = true;
            bgactive.value = true;
        };

        let showFile = (id) => {
            contractid.value = id;
            fileModal.value = true;
            bgactive.value = true;
        };

        let showSuccess = () => {
            successModal.value = true;
            bgactive.value = true;
        };

        let hideSuccess = () => {
            successModal.value = false;
            bgactive.value = false;
        };

        const hidemodal = () => {
            getemployees();
            fileModal.value = false;
            bgactive.value = false;
            showModal.value = false;
            setTimeout(()=>{
                getdoeId(doeId.value)
            },500)
        };

        let closemessage = ()=>{
            message.value = false;
            console.log("hey");
        }


        let getfile = (fileData)=>{
            console.log(fileData);
            window.open(`https://api.internationalfocusgeneralservice.com//storage/${fileData}`);
        }

        let chgbtn = ()=>{
            setTimeout(()=>{
                edit.value = !edit.value
            },3000)
        }

        let deleteContract = async(id)=>{
           if( window.confirm("Are you sure want to delete")){
            try {
                let res = await axios.delete(`contract_upload/${id}`)
                if(res){
                    console.log(res.data.message);
                    getemployees();
                    showSuccess();
                    setTimeout(()=>{
                        getdoeId(doeId.value)
                        hideSuccess();
                    },2000)
                }
            } catch (error) {
                if(error.response){
                    errorMessage.value = error.response.data.message
                    console.log(error.response.data.message);
                }
            }
           }
           
        }


        return{
            doeId,does,contractPlace,contractDate,
            trainingDate,depatureDate,fillterEmployees,employees,getdoeId,
            showModal,showmodal,hidemodal,allEmployees,selectedEmployees,selectedallEmployee,
            handleSubmit,userid,uploadFile,file,fileModal,showFile,bgactive,contractid,getfile,
            successModal,showSuccess,hideSuccess,errorMessage,closemessage,edit,chgbtn,
            day,month,year,deleteContract
        }

    }
}
</script>

<style>




</style>