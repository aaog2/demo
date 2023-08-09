<template>
    <div class="bg-light mains"  :class="showModal === true ? 'red' : 'blue'">
        <Navbar/>
        <LoadingPage v-if="!employees"/>
        <CvModal v-if="showModal" :id="userid" @closeModal="hidemodal" @passed="passed" @failed="failed" @pending="pending"/>
        <div class="page"> 
            <div class="containers py-4">
                <h4 class="py-2">Review Worker CVs</h4>

                <div class="row mt-4">
                    <!-- chose DOE Num -->
                    <div class="form-group col-3">
                            <label for="doenum">DOE Number</label>
                                <select class="form-select bg-light" id="doenum" v-model="doeId" @change="getdoeId(doeId)">
                                    <option v-for="doe in does" :key="doe.id" :value="doe.doe_id">{{ doe.doe_id }}</option>     
                                </select>
                    </div>
                    <!-- choose status -->
                    <div class="col-4 statusContainer">
                        <label class="mx-4">Status</label>
                        <div class="d-flex mx-3 mt-1 ">
                            <span class="badge status btn btn-outline-danger rounded-pill mx-2 text-danger" :class="filterStatus === 'failed' ? 'red' : 'blue'" @click="getfilter('failed')"><span v-if="filterStatus==='failed'"><font-awesome-icon icon="fa-solid fa-check" class="me-2" /></span>Failed</span>
                            <span class="badge status btn btn-outline-warning  rounded-pill mx-2 text-warning " :class="filterStatus === 'pending' ? 'red' : 'blue'" @click="getfilter('pending')"><span v-if="filterStatus==='pending'"><font-awesome-icon icon="fa-solid fa-check" class="me-2" /></span>Pending</span>
                            <span class="badge status btn btn-outline-success rounded-pill mx-2 text-success" :class="filterStatus === 'passed' ? 'red' : 'blue'" @click="getfilter('passed')"><span v-if="filterStatus==='passed'"><font-awesome-icon icon="fa-solid fa-check" class="me-2" /></span>Passed</span>                  
                        </div>
                    
                    </div>
                </div>
                <!-- Worker Table -->
                <div class="mt-5 me-3">
                    <h6>{{ workernum }} Worker CVs</h6>
                    <div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th>No</th>
                                <th>Worker ID</th>
                                <th>Name(En)</th>
                                <th>NRC Number</th>
                                <th>Gender</th>
                                <th>Status</th>
                                <th>Details</th>
                                </tr>
                            </thead>
                            <tbody v-if="reload">
                                <div class="reload">
                                <div class="one"></div>
                                <div class="two"></div>
                                <div class="three"></div>
                                <div class="four"></div>
                                <div class="five"></div>
                                </div>
                            </tbody>
                            <tbody  v-if="!reload">
                                <tr v-for="(employees,index) in fillterEmployees" :key="employees.id">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ employees.user.employee_id }}</td>
                                    <td>{{ employees.name_en }}</td>
                                    <td>{{ employees.nrc }}</td>
                                    <td>{{ employees.gender }}</td>
                                    <td><span class="badge rounded-pill mx-2" :class="employees.cv_result">{{ employees.cv_result }}</span></td>
                                    <td class=""><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" @click="showmodal({id:employees.user.id,index})" />
                                    </td>    
                                    <td class="col-1">
                                        <div v-if="employees.cv" class="circle bg-warning"></div>
                                        <div v-else class="circle bg-info"></div>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="refleshbtn" @click="reloadTable">
                    <font-awesome-icon icon="fa-solid fa-arrows-rotate " size="lg" />
                    <!-- <font-awesome-icon icon="fa-solid fa-arrows-rotate " size="lg" /> -->
                </div>

            </div>
        </div>
    </div>
  
</template>

<script>
import Navbar from '../components/Navbar.vue'
import CvModal from '../components/Cvmodal.vue';
import { computed, ref,onMounted } from 'vue';
import LoadingPage from '../components/LoadingPage.vue'
import { useStore } from 'vuex';
import axios from "axios";
export default {
    components:{Navbar,CvModal,LoadingPage},
    setup(){
        let store = useStore();
        let doeId=ref();
        let fillterEmployees = ref();
        let userid = ref();
        let employees = ref();
        let statusindex = ref();
        let filterStatus=ref(null);
        let workernum = ref();
        let reload = ref(false);

        const showModal = ref(false);


         // get DOE Data
        let does = computed(()=>{
            return store.state.doeModule.does
        })

        let getData = ()=> store.dispatch('doeModule/getDoes');
        getData();

        // let getcurrentDoe =()=>{
        //     let id = localStorage.getItem("doe");
        //     if(id){
        //         doeId.value = id;
        //         setTimeout(() => {
        //             getdoeId(id)
        //         },300);
        //     }
        // }

        // get All Employees Data
        let getemployees = async()=>{
                try {
                    let res = await axios.get("employee_infos")
                    // console.log(res.data);
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
                // getcurrentDoe()
            })


        // console.log(employees.value);

        let getdoeId =(id)=>{
            console.log(id);
            // localStorage.setItem("doe",id);
            fillterEmployees.value = employees.value.data.filter((employee)=>{
                if(employee.doe !== null){
                    return employee.doe.doe_id == id
                }
            })
            workernum.value=fillterEmployees.value.length
            console.log(fillterEmployees.value);
        }
        
        

        // modal function
        let showmodal = (id) => {
            userid.value = id;
            statusindex.value = id.index;
            showModal.value = true;
        };

        const hidemodal = () => {
            showModal.value = false;
        };

        let passed =()=>{
            console.log(statusindex.value);
            console.log('passed');
            console.log(fillterEmployees.value[statusindex.value].cv_result);
            fillterEmployees.value[statusindex.value].cv_result = 'passed'
        }

        let failed =()=>{
            console.log(statusindex.value);
            console.log('reject');
            console.log(fillterEmployees.value[statusindex.value].cv_result);
            fillterEmployees.value[statusindex.value].cv_result = 'failed'
        }

        let pending =()=>{
            console.log(statusindex.value);
            console.log('pending');
            console.log(fillterEmployees.value[statusindex.value].cv_result);
            fillterEmployees.value[statusindex.value].cv_result = 'pending'
        }

         //Filter Function
         let getfilter=async(value)=>{
            console.log(value);
            if(filterStatus.value===value){
                filterStatus.value=null;
                fillterEmployees.value=null;
            }else{
                filterStatus.value=value;
                fillterEmployees.value=employees.value.data.filter((employee)=>{
                if (doeId.value && employee.doe !== null) {  
                    return employee.doe.doe_id == doeId.value & employee.cv_result == value
                }else{
                    return employee.cv_result == value
                }
                    
            })
            }
            
        }

        let reloadTable =()=>{
            reload.value = true;
            getemployees()
            setTimeout(() => {
                getdoeId(doeId.value);
                reload.value = false;
            }, 2000);
        }

        return{
            does,employees,doeId,
            getdoeId,fillterEmployees,
            showModal,showmodal,hidemodal,userid,passed,failed,pending,statusindex,getfilter,workernum,filterStatus,
            reloadTable,reload
        }
    }
}
</script>

<style>

</style>