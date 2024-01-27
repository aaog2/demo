<template>
  <div
    class="bg-light mains"
    :class="showModal && !errorMessage ? 'red' : 'blue'"
  >
    <Navbar />
    <SideNavbar></SideNavbar>
    <!-- <LoadingPage v-if="!employees"/> -->
    <CvModalview
      v-if="showModal && !errorMessage"
      :id="userid"
      @closeModal="hidemodal"
    />
    <div v-if="errorMessage && message" class="errorMessage">
      <div class="error-message">
        <div class="modalss">
          <img
            src="http://100dayscss.com/codepen/alert.png"
            width="44"
            height="38"
          />
          <span class="title">ops !</span>
          <p class="my-2">{{ errorMessage }}</p>
          <button class="btn btn-danger" @click="errorMessage = null">
            <router-link to="/" class="my-auto"> Close </router-link>
          </button>
        </div>
      </div>
    </div>
    <div class="page">
      <div class="containers pt-4 pb-5">
        <h4 class="text-bold py-2">Worker Information</h4>
        <div class="row mt-4">
          <!-- chose DOE Num -->
          <div class="form-group col-3">
            <label for="doenum">DOE Number</label>
            <select class="form-select bg-light" id="doenum" v-model="doeId">
              <option>0316.4\/25513(20.1.2023)</option>
              <option>02514\/25513(30.1.2023)</option>
              <option>03185\/25513(10.1.2023)</option>
            </select>
          </div>

          <div class="col-3 download">
            <button
              class="btn btn-outline-warning"
              @click="downloadData(doeId)"
            >
              <font-awesome-icon icon="fa-solid fa-file-export" />
            </button>
          </div>
        </div>
        <!-- Worker Table -->
        <div class="mt-5 me-3">
          <!-- <h6>{{ workernum }} Workers Info</h6> -->
          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Worker ID</th>
                  <th scope="col">Name(En)</th>
                  <th scope="col">NRC Number</th>
                  <th scope="col">Father Name(En)</th>
                  <th scope="col">Dob</th>
                  <th scope="col">Address</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Contract</th>
                  <th scope="col">Details</th>
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
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>001</td>
                  <td>Aye Mon</td>
                  <td>၈/မဘန(နိုင်)၁၅၆၅၅၀</td>
                  <td>ဝင်းဦး</td>
                  <!-- <td v-if="employees.cv_data == null" class="text-danger">No Data</td> -->
                  <td>12/6/2000</td>
                  <td>Minbu</td>
                  <td>Female</td>
                  <td>
                    <span class="btn btn-sm btn-danger">255 days ago</span>
                  </td>
                  <td>
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-up-right-from-square"
                      @click="showmodal({ id: employees.user_id, index })"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>002</td>
                  <td>Mya Mya</td>
                  <td>၆/လလန(နိုင်)၀၉၈၀၅၀</td>
                  <td>ဦးမြင့်</td>
                  <!-- <td v-if="employees.cv_data == null" class="text-danger">No Data</td> -->
                  <td>12/6/2000</td>
                  <td>Mandalay</td>
                  <td>Female</td>
                  <td>
                    <span class="btn btn-sm btn-success">150 days ago</span>
                  </td>
                  <td>
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-up-right-from-square"
                      @click="showmodal({ id: employees.user_id, index })"
                    />
                  </td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>003</td>
                  <td>Aung Aung</td>
                  <td>၁၂/လညန(နိုင်)၂၄၃၄၅၄</td>
                  <td>ဝင်းဦး</td>
                  <!-- <td v-if="employees.cv_data == null" class="text-danger">No Data</td> -->
                  <td>12/6/2000</td>
                  <td>Yangon</td>
                  <td>Male</td>
                  <td>
                    <span class="btn btn-sm btn-success">100 days ago</span>
                  </td>
                  <td>
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-up-right-from-square"
                      @click="showmodal()"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import SideNavbar from "../components/SideNavbar.vue";
import CvModalview from "../components/Cvmodalview.vue";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import LoadingPage from "../components/LoadingPage.vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  components: { Navbar, SideNavbar, CvModalview, LoadingPage },
  setup() {
    let router = useRouter();
    let store = useStore();
    let doeId = ref();
    let userid = ref();
    let fillterEmployees = ref();
    let message = ref(true);
    let contractDate = ref();
    let contractArray = ref([]);
    let employees = ref();
    let reload = ref(false);
    let showModal = ref(false);
    let errorMessage = ref();

    // get Error Message

    // get DOE Data

    let does = [];

    let getData = () => store.dispatch("doeModule/getDoes");
    getData();

    //   get employee
    let getemployees = async () => {
      employees.value = {
        data: {
          employee_id: "156550PAN EI PHYU",
          doe: {
            doe_id: "0316.4\/25513(20.1.2023)",
            id: 4,
            factory_name: "I Tail Corporation Public Co.,Ltd",
            factory_category:
              "ပလတ်စတစ်ဖြင့်ပြုလုပ်သော အီလက်ထရောနစ်ပစ္စည်းများ ထုတ်လုပ်သည့် လုပ်ငန်း",
            factory_location: "Songkhla",
            factory_country: "Thailand",
            salary: "340",
            is_new_employee: 0,
            created_at: "2023-10-23T04:17:57.000000Z",
            updated_at: "2023-10-23T04:17:57.000000Z",
          },
          employee_info: {
            user_id: 46,
            name_mm: "ပန်းအိဖြူ",
            name_en: "PAN EI PHYU",
            father_name_mm: "ဝင်းဦး",
            mother_name_en: "THAN THAN WIN",
            mother_name_mm: "သန်းသန်းဝင်း",
            father_name_en: "U WIN OO",
            gender: "female",
            dob: "05-10-1995",
            nrc: "၈\/မဘန(နိုင်)၁၅၆၅၅၀",
            cv_result: "passed",
            cv_result_date: "2023-12-21 04:48:30",
            worker_result: "passed",
            worker_result_note: null,
            worker_result_date: "2023-12-21 05:16:55",
            medical_result: "passed",
            medical_result_note: null,
            medical_result_date: "2023-12-21 05:17:35",
            first_survey_permission: null,
            second_survey_permission: null,
            third_survey_permission: 1,
            fourth_survey_permission: 1,
            fifth_survey_permission: 1,
            sixth_survey_permission: 1,
            seventh_survey_permission: 1,
            eighth_survey_permission: 1,
          },
          surveyIds: {
            first_survey_id: null,
            second_survey_id: null,
            third_survey_id: 13,
            fourth_survey_id: 14,
            fifth_survey_id: 11,
            sixth_survey_id: 11,
            seventh_survey_id: 11,
            eighth_survey_id: null,
          },
          cv_data: {
            id: 92,
            user_id: 46,
            photo: "workerPhotos\/17031341075 PAN EI PHYU.png",
            address: "Minbu",
            state: "မကွေး",
            weight: "160",
            height: "5.",
            education: "Grade - 5",
            work_exp: "တောင်သူ",
            has_family_list: 1,
            answer_1: "ဆွေမျိုးမှ တစ်ဆင့်",
            answer_2: "ဆွေမျိုးမှ တဆင့်",
            phone_number: "09758698166",
            has_passport: 1,
            answer_3: "အေဂျင်စီမှ တစ်ဆင့်",
            passport_cost: "85000",
            has_covid_vaccine: 1,
            first_covid_vaccine_name: "Sputnik Light",
            first_vaccinated_date: "14-09-2021",
            second_covid_vaccine_name: "AstraZeneca",
            second_vaccinated_date: "14-10-2021",
            third_covid_vaccine_name: null,
            third_vaccinated_date: null,
            vaccinated_note: null,
            is_color_blind: 1,
            is_color_blind_note: null,
            has_e_skill: 0,
            has_e_skill_note: null,
            has_math_skill: 1,
            has_math_skill_note: null,
            can_wait: 1,
            can_wait_note: null,
            has_family_in_foreign: 1,
            has_family_in_foreign_note: null,
            has_workexp_in_foreign: 1,
            has_workexp_in_foreign_note: null,
            has_paid_forJob: 0,
            has_paid_forJob_note: null,
            created_at: "2023-12-20T08:19:39.000000Z",
            updated_at: "2023-12-21T04:48:27.000000Z",
          },
          passport_data: {
            id: 39,
            user_id: 46,
            passport_number: "MH 406061",
            passport_created_date: "15-5-2023",
            passport_expired_date: "14-5-2028",
            passport_location: "BAGO",
            address_english: "MINBU",
            created_at: "2023-12-21T05:57:30.000000Z",
            updated_at: "2023-12-21T05:57:30.000000Z",
          },
          owic_data: {
            id: 39,
            user_id: 46,
            owic_number: '"YGN 0638781"',
            owic_created_date: "20-12-2023",
            owic_created_place: "yangon",
            training_start_date: "19-12-2023",
            departure_date: "16-1-2024",
            created_at: "2024-01-17T03:05:33.000000Z",
            updated_at: "2024-01-17T03:05:33.000000Z",
          },
          contrat_upload_data: {
            id: 40,
            user_id: 46,
            pdf: "contracts\/17032323225 PAN EI PHYU.pdf",
            contract_place: "YANGON",
            contract_date: "23-10-2023",
            created_at: "2023-12-22T04:03:04.000000Z",
            updated_at: "2023-12-22T08:05:22.000000Z",
          },
        },
      };
    };

    // console.log(employees.value.data);
    onMounted(() => {
      getemployees();
      // getcurrentDoe()
    });

    let getdoeId = (id) => {
      if (employees.value) {
        fillterEmployees.value = employees.value.data.filter((employee) => {
          if ((employee.contrat_upload !== null) & (employee.doe !== null)) {
            return employee.doe.doe_id == id;
          }
        });
      }

      console.log(fillterEmployees.value);
      contractDate.value = fillterEmployees.value.forEach((fillterEmp) => {
        if (fillterEmp.contract_upload) {
          console.log("change fix", fillterEmp.contract_upload.contract_date);
          let daysSinceLastDate = computed(() => {
            const currentDate = new Date();
            const dateParts =
              fillterEmp.contract_upload.contract_date.split("-");
            console.log(dateParts);
            var dateObject = new Date(
              +dateParts[2],
              dateParts[1] - 1,
              +dateParts[0]
            );
            console.log("previousDate", dateObject);
            const timeDifference = currentDate.getTime() - dateObject.getTime();
            console.log("time Diff = ", timeDifference);
            const daysDifference = Math.floor(
              timeDifference / (1000 * 60 * 60 * 24)
            );
            console.log(daysDifference);
            return daysDifference;
          });
          console.log(daysSinceLastDate.value);
          contractArray.value.push(daysSinceLastDate.value);
        }
      });
    };

    // modal function
    let showmodal = (id) => {
      userid.value = id;
      showModal.value = true;
    };

    const hidemodal = () => {
      showModal.value = false;
    };

    let closemessage = () => {
      // message.value = false;
      router.go(0);
      console.log("hey");
    };

    let downloadData = async (id) => {
      await axios({
        method: "get",
        url: `https://api.internationalfocusgeneralservice.com/api/export/does/${id}`,
        responseType: "blob", // Set the response type to 'blob' to handle binary data
      })
        .then((response) => {
          // Create a download link for the received blob and trigger the download
          const downloadLink = document.createElement("a");
          const url = window.URL.createObjectURL(new Blob([response.data]));
          downloadLink.href = url;
          downloadLink.setAttribute("download", `doe5_data_${id}.xlsx`);
          document.body.appendChild(downloadLink);
          downloadLink.click();
          window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
          if (error) {
            errorMessage.value = error.message;
          }
          console.error("Error exporting Excel:", error);
        });
    };

    let reloadTable = () => {
      reload.value = true;
      getemployees();
      setTimeout(() => {
        getdoeId(doeId.value);
        reload.value = false;
      }, 2000);
    };

    return {
      does,
      doeId,
      getdoeId,
      fillterEmployees,
      showModal,
      showmodal,
      hidemodal,
      userid,
      errorMessage,
      closemessage,
      message,
      contractDate,
      contractArray,
      downloadData,
      reload,
      reloadTable,
      employees,
    };
  },
};
</script>

<style></style>
