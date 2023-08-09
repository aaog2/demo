<template>
  <div class="bg-light mains" :class="bgactive === true ? 'red' : 'blue'">
    <Navbar/>
    <Passportmodal v-if="showModal" :id="userid" @closeModal="hidemodal"></Passportmodal>
    <Owicmodal v-if="owicModal" :id="userid" @closeModal="hidemodal"></Owicmodal>
    <div class="page">
        <div class="containers pt-4">
            <h4 class="py-2">OWIC</h4>
            <!-- chose DOE Num -->
            <div class="form-group col-3 mt-4">
                    <label for="doenum">DOE Number</label>
                        <select class="form-select bg-light" id="doenum" v-model="doeId" @change="getdoeId(doeId)">
                            <option v-for="doe in does" :key="doe.id" :value="doe.doe_id">{{ doe.doe_id }}</option>     
                        </select>
            </div>
            <!-- table -->
            <div class="containers mt-5">
                <!-- title -->
                <h4 class="py-4">Workers Information</h4>
                <!-- Information Table-->
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Worker ID</th>
                        <th scope="col">Name (En)</th>
                        <th scope="col">NRC Number</th>
                        <th scope="col">Father Name(En)</th>
                        <th scope="col">Owic</th>
                        <!-- <th scope="col">Owic</th> -->
                        </tr>
                    </thead>
                    <tbody v-for="(employees,index) in fillterEmployees" :key="employees.id">
                        <tr>
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ employees.user.employee_id }}</td>
                        <td>{{ employees.name_en }}</td>
                        <td>{{employees.nrc }}</td>
                        <td>{{ employees.father_name_en }}</td>
                        <td>
                            <div>
                                <button v-if="employees.owic" class="btn btn-success btn-sm mx-1"  @click="showowicmodal(employees.user_id)">View Owic</button>
                                <button v-else class="btn btn-primary btn-sm mx-1"  @click="showowicmodal(employees.user_id)">Owic Upload</button>
                            </div>
                        </td>
                       
                        <!-- <td><font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" @click="showmodal({user_id:employees.employee_info.user_id,id:employees.passport_and_owic_data})" /></td> -->
                        </tr>
                    </tbody>
                </table>
        </div>
            
        </div>
        
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Owicmodal from '../components/Owicmodal.vue';
import Passportmodal from '../components/Passportmodal.vue';
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from "axios";

export default {
components:{Navbar,Passportmodal,Owicmodal},
setup(){
    let showModal = ref(false);
    let owicModal = ref(false);
    let employees = ref();
    let store = useStore();
    let doeId=ref();
    let fillterEmployees = ref();
    let userid = ref();
    let bgactive = ref(false);



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
            })



        let getdoeId =(id)=>{
            // console.log(id);
            console.log(employees.value);
            fillterEmployees.value = employees.value.data.filter((employee)=>{
                if(employee.doe !== null){
                    return employee.doe.doe_id == id
                }
                
                // console.log(employee.doe);
            })
        }


    let showmodal = (id) => {
            userid.value = id;
            showModal.value = true;
            bgactive.value = true;
        };

    let showowicmodal = (id) => {
            userid.value = id;
            owicModal.value = true;
            bgactive.value = true;
        };    

    let hidemodal = () => {
        // console.log("hide modal")
            getemployees();
            bgactive.value = false;
            setTimeout(()=>{
                owicModal.value = false;
                    getdoeId(doeId.value)
            },500)
        };


    return{
        doeId,does,getdoeId,fillterEmployees,employees,
        showModal,showmodal,hidemodal,userid,owicModal,showowicmodal,bgactive
    }

}
}
</script>

<style>

</style>