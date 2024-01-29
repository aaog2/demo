<template>
  <div class="bg-light mains" :class="showModal === true ? 'red' : 'blue'">
    <Navbar />
    <SideNavbar></SideNavbar>
    <!-- <LoadingPage v-if="!employees"/> -->
    <CvModal
      v-if="showModal"
      :id="userid"
      @closeModal="hidemodal"
      @passed="passed"
      @failed="failed"
      @pending="pending"
    />
    <div class="page">
      <div class="containers py-4">
        <h4 class="py-2">Review Worker CVs</h4>

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
          <!-- choose status -->
          <!-- <div class="col-4 statusContainer">
            <label class="mx-4">Status</label>
            <div class="d-flex mx-3 mt-1">
              <span
                class="badge status btn btn-outline-danger rounded-pill mx-2 text-danger"
                :class="filterStatus === 'failed' ? 'red' : 'blue'"
                @click="getfilter('failed')"
                ><span v-if="filterStatus === 'failed'"
                  ><font-awesome-icon
                    icon="fa-solid fa-check"
                    class="me-2" /></span
                >Failed</span
              >
              <span
                class="badge status btn btn-outline-warning rounded-pill mx-2 text-warning"
                :class="filterStatus === 'pending' ? 'red' : 'blue'"
                @click="getfilter('pending')"
                ><span v-if="filterStatus === 'pending'"
                  ><font-awesome-icon
                    icon="fa-solid fa-check"
                    class="me-2" /></span
                >Pending</span
              >
              <span
                class="badge status btn btn-outline-success rounded-pill mx-2 text-success"
                :class="filterStatus === 'passed' ? 'red' : 'blue'"
                @click="getfilter('passed')"
                ><span v-if="filterStatus === 'passed'"
                  ><font-awesome-icon
                    icon="fa-solid fa-check"
                    class="me-2" /></span
                >Passed</span
              >
            </div>
          </div> -->
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
              <tbody v-if="!reload">
                <tr
                  v-for="(employees, index) in fillterEmployees"
                  :key="employees.id"
                >
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ employees.user.employee_id }}</td>
                  <td>{{ employees.name_en }}</td>
                  <td>{{ employees.nrc }}</td>
                  <td>{{ employees.gender }}</td>
                  <td>
                    <span
                      class="badge rounded-pill mx-2"
                      :class="employees.cv_result"
                      >{{ employees.cv_result }}</span
                    >
                  </td>
                  <td class="">
                    <font-awesome-icon
                      icon="fa-solid fa-arrow-up-right-from-square"
                      @click="showmodal({ id: employees.user.id, index })"
                    />
                  </td>
                  <td class="col-1">
                    <div v-if="employees.cv" class="circle bg-info"></div>
                    <div v-else class="circle bg-warning"></div>
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
import CvModal from "../components/Cvmodal.vue";
import { computed, ref, onMounted } from "vue";
import LoadingPage from "../components/LoadingPage.vue";
import { useStore } from "vuex";
import axios from "axios";
export default {
  components: { Navbar, SideNavbar, CvModal, LoadingPage },
  setup() {
    let store = useStore();
    let doeId = ref();
    let fillterEmployees = ref();
    let userid = ref();
    let employees = ref();
    let statusindex = ref();
    let filterStatus = ref(null);
    let workernum = ref();
    let reload = ref(false);

    const showModal = ref(false);

    // get DOE Data
    let does = computed(() => {
      return store.state.doeModule.does;
    });

    let getData = () => store.dispatch("doeModule/getDoes");
    getData();

    // get All Employees Data
    let getemployees = async () => {
      try {
        let res = await axios.get("employee_infos");
        // console.log(res.data);
        employees.value = res;
      } catch (error) {
        if (error.response) {
          errorMessage.value = error.response.data.message;
          console.log(error.response.data.message);
        }
      }
    };

    // console.log(employees.value.data);
    onMounted(() => {
      getemployees();
      // getcurrentDoe()
    });

    // console.log(employees.value);
    // localStorage.setItem("doe",id);
    fillterEmployees.value = [
      {
        employee_info_id: 2,
        user_id: 2,
        cv_id: 15,
        passport_id: 13,
        owic_id: 7,
        contract_upload_id: 7,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: null,
        fourth_survey_id: null,
        fifth_survey_id: null,
        sixth_survey_id: null,
        seventh_survey_id: null,
        eighth_survey_id: null,
        name_en: "AYE AYE",
        name_mm: "အေးအေး",
        father_name_en: "U MYINT",
        father_name_mm: "ဦးမြင့်",
        mother_name_en: "DAW THEIN",
        mother_name_mm: "သိန်း",
        gender: "female",
        dob: "1987-09-04",
        address: null,
        nrc: "၆\/လလန(နိုင်)၅၄၄၅၄၅၄",
        nrc_english: "6\/LALANA(N)098515",
        religion: "ဗုဒ္ဓ",
        ethnic: "ဗမာ",
        doe_id: "035441\/29410(24.1.2023)",
        first_survey_permission: null,
        second_survey_permission: null,
        third_survey_permission: null,
        fourth_survey_permission: null,
        fifth_survey_permission: null,
        sixth_survey_permission: null,
        seventh_survey_permission: null,
        eighth_survey_permission: null,
        cv_result: "passed",
        cv_result_date: "2023-08-10 07:20:36",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-06T19:49:23.000000Z",
        updated_at: "2023-08-22T05:24:45.000000Z",
        doe: {
          doe_id: "035252.4\/29410(24.1.2023)",
          id: 1,
          factory_name: "Thai Public Co.,ltd",
          factory_category: "ပင်လယ်အစားအစာထုတ်လုပ်ခြင်း",
          factory_location: "Samutsakhonvcvf",
          factory_country: "Thailand",
          salary: "354",
          is_new_employee: 0,
          created_at: null,
          updated_at: null,
        },
        user: {
          id: 2,
          employee_id: "09805114AYE AYE PHOAE",
          role: "employee",
          created_at: "2023-08-06T19:49:23.000000Z",
          updated_at: "2023-08-06T19:49:23.000000Z",
        },
        cv: {
          id: 15,
          user_id: 2,
          photo:
            "workerPhotos\/1691675228340077291_167520156223334_7747986340216897816_n.jpg",
          address: null,
          state: null,
          weight: null,
          height: null,
          education: null,
          work_exp: null,
          has_family_list: null,
          answer_1: null,
          answer_2: null,
          phone_number: null,
          has_passport: null,
          answer_3: null,
          passport_cost: null,
          has_covid_vaccine: null,
          first_covid_vaccine_name: null,
          first_vaccinated_date: null,
          second_covid_vaccine_name: null,
          second_vaccinated_date: null,
          third_covid_vaccine_name: null,
          third_vaccinated_date: null,
          vaccinated_note: null,
          is_color_blind: null,
          is_color_blind_note: null,
          has_e_skill: null,
          has_e_skill_note: null,
          has_math_skill: null,
          has_math_skill_note: null,
          can_wait: null,
          can_wait_note: null,
          has_family_in_foreign: null,
          has_family_in_foreign_note: null,
          has_workexp_in_foreign: null,
          has_workexp_in_foreign_note: null,
          has_paid_forJob: null,
          has_paid_forJob_note: null,
          created_at: "2023-08-07T09:18:41.000000Z",
          updated_at: "2023-08-10T13:47:08.000000Z",
        },
        passport: {
          id: 13,
          user_id: 2,
          passport_number: "MF 83758545",
          passport_created_date: "23-5-2022",
          passport_expired_date: "22-5-2027",
          passport_location: "BANGKOK",
          address_english: "LAUNGLON",
          created_at: "2023-08-14T07:06:53.000000Z",
          updated_at: "2023-08-14T07:06:53.000000Z",
        },
        owic: {
          id: 7,
          user_id: 2,
          owic_number: '"YGN 056987921211"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:24:45.000000Z",
          updated_at: "2023-08-22T05:24:45.000000Z",
        },
        contract_upload: {
          id: 7,
          user_id: 2,
          pdf: "contracts\/169200109101 AYE AYE PYOAE.pdf",
          contract_place: "HPA-AN",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:31:07.000000Z",
          updated_at: "2023-08-14T08:18:11.000000Z",
        },
      },
      {
        employee_info_id: 3,
        user_id: 3,
        cv_id: 29,
        passport_id: 14,
        owic_id: 8,
        contract_upload_id: 8,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: null,
        fourth_survey_id: null,
        fifth_survey_id: null,
        sixth_survey_id: null,
        seventh_survey_id: null,
        eighth_survey_id: null,
        name_en: "AYE THU ZAR",
        name_mm: "အေးသူဇာ",
        father_name_en: "U THAN",
        father_name_mm: "သန်း",
        mother_name_en: "DAW THAN",
        mother_name_mm: "သန်း",
        gender: "female",
        dob: "1991-03-24",
        address: null,
        nrc: "၁၀\/ပမန(နိုင်)၂၁၄၀၇၁၅၄၅၄",
        nrc_english: "10\/PAMANA(N)214071",
        religion: "ဗုဒ္ဓ",
        ethnic: "ဗမာ",
        doe_id: "0316.4\/29410(24.1.2023)",
        first_survey_permission: null,
        second_survey_permission: null,
        third_survey_permission: null,
        fourth_survey_permission: null,
        fifth_survey_permission: null,
        sixth_survey_permission: null,
        seventh_survey_permission: null,
        eighth_survey_permission: null,
        cv_result: "passed",
        cv_result_date: "2023-08-10 07:20:53",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-06T20:01:14.000000Z",
        updated_at: "2023-08-22T05:25:26.000000Z",
        doe: {
          doe_id: "0316.4\/29410(24.1.2023)",
          id: 1,
          factory_name: "Thai Group Public Co.,ltd",
          factory_category: "ပင်လယ်အစားအစာထုတ်လုပ်ခြင်း",
          factory_location: "Samutsakhon",
          factory_country: "Thailand",
          salary: "354",
          is_new_employee: 0,
          created_at: null,
          updated_at: null,
        },
        user: {
          id: 3,
          employee_id: "214071AYE THU ZAR",
          role: "employee",
          created_at: "2023-08-06T20:01:14.000000Z",
          updated_at: "2023-08-06T20:01:14.000000Z",
        },
        cv: {
          id: 29,
          user_id: 3,
          photo: "workerPhotos\/1691400217PXL_20230807_090753945.jpg",
          address: "ပေါင်ကခံ",
          state: "မွန်",
          weight: "100",
          height: "5.2",
          education: "Grade - 4",
          work_exp: "11",
          has_family_list: 1,
          answer_1: "အမတွေဆီကသိပါတယ်",
          answer_2: "အမဆက်သွယ်ပေးပါတယ်",
          phone_number: "096768224515",
          has_passport: 1,
          answer_3: "TUF",
          passport_cost: "စက်ရုံကပေးပါသည်",
          has_covid_vaccine: 1,
          first_covid_vaccine_name: "Covidshield",
          first_vaccinated_date: "2021-09-04",
          second_covid_vaccine_name: "Covidshield",
          second_vaccinated_date: "2021-12-03",
          third_covid_vaccine_name: null,
          third_vaccinated_date: null,
          vaccinated_note: null,
          is_color_blind: 1,
          is_color_blind_note: null,
          has_e_skill: 1,
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
          created_at: "2023-08-07T09:23:37.000000Z",
          updated_at: "2023-08-07T09:23:41.000000Z",
        },
        passport: {
          id: 14,
          user_id: 3,
          passport_number: "MF 836254",
          passport_created_date: "20-05-2022",
          passport_expired_date: "19-05-2027",
          passport_location: "BANGKOK",
          address_english: "PAUNG",
          created_at: "2023-08-14T07:08:16.000000Z",
          updated_at: "2023-08-14T07:08:16.000000Z",
        },
        owic: {
          id: 8,
          user_id: 3,
          owic_number: '"YGN 05698812121"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:25:26.000000Z",
          updated_at: "2023-08-22T05:25:26.000000Z",
        },
        contract_upload: {
          id: 8,
          user_id: 3,
          pdf: "contracts\/169200115302 AYE THU ZAR.pdf",
          contract_place: "HPA-AN",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:31:07.000000Z",
          updated_at: "2023-08-14T08:19:13.000000Z",
        },
      },
      {
        employee_info_id: 4,
        user_id: 4,
        cv_id: 18,
        passport_id: 4,
        owic_id: 9,
        contract_upload_id: 9,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: 4,
        fourth_survey_id: 4,
        fifth_survey_id: 3,
        sixth_survey_id: 3,
        seventh_survey_id: 7,
        eighth_survey_id: null,
        name_en: "YIN MAR ",
        name_mm: "ရင်မာ",
        father_name_en: "U MYINT",
        father_name_mm: "မြင့်",
        mother_name_en: "DAW AYE",
        mother_name_mm: "အေး",
        gender: "female",
        dob: "1994-11-02",
        address: null,
        nrc: "၆\/ပလန(နိုင်)၁၂၄၃၄၄၃",
        nrc_english: "6\/PALANA(N)1247151",
        religion: "ဗုဒ္ဓ",
        ethnic: "ဗမာ",
        doe_id: "0316.4\/29410(24.1.2023)",
        first_survey_permission: null,
        second_survey_permission: null,
        third_survey_permission: 1,
        fourth_survey_permission: 1,
        fifth_survey_permission: 1,
        sixth_survey_permission: 1,
        seventh_survey_permission: 1,
        eighth_survey_permission: 1,
        cv_result: "passed",
        cv_result_date: "2023-08-10 07:21:03",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-07T02:59:08.000000Z",
        updated_at: "2023-12-11T04:09:59.000000Z",
        doe: {
          doe_id: "0316.4\/29410(24.1.2023)",
          id: 1,
          factory_name: "Thai public Co.,ltd",
          factory_category: "ပင်လယ်အစားအစာထုတ်လုပ်ခြင်း",
          factory_location: "Samutsakhon",
          factory_country: "Thailand",
          salary: "354",
          is_new_employee: 0,
          created_at: null,
          updated_at: null,
        },
        user: {
          id: 4,
          employee_id: "124779YIN MAR PHYO",
          role: "employee",
          created_at: "2023-08-07T02:59:08.000000Z",
          updated_at: "2023-08-07T02:59:08.000000Z",
        },
        cv: {
          id: 18,
          user_id: 4,
          photo: "workerPhotos\/1691399999IMG_20230807_143344.jpg",
          address: "ပုလောမြို့ လယ်ဖတ်ကျေးရွာ",
          state: "တနင်္သာရီ",
          weight: "110",
          height: "5.4",
          education: "Grade - 5",
          work_exp: "TUF 11",
          has_family_list: 1,
          answer_1: "ဦးလေး",
          answer_2: "ဦးလေး",
          phone_number: "0926278611441",
          has_passport: 0,
          answer_3: "ထိုင်းမှာလုပ်ခဲ့သည်",
          passport_cost: "ရုံကပေးသည်",
          has_covid_vaccine: 1,
          first_covid_vaccine_name: "Covidshield",
          first_vaccinated_date: "2021-07-29",
          second_covid_vaccine_name: "Covidshield",
          second_vaccinated_date: "2022-06-29",
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
          created_at: "2023-08-07T09:19:59.000000Z",
          updated_at: "2023-08-07T09:20:13.000000Z",
        },
        passport: {
          id: 4,
          user_id: 4,
          passport_number: "MF 8375252121",
          passport_created_date: "2022-05-23",
          passport_expired_date: "2027-05-22",
          passport_location: "BANGKOK",
          address_english: "PALAW",
          created_at: "2023-08-07T09:58:30.000000Z",
          updated_at: "2023-08-07T09:58:30.000000Z",
        },
        owic: {
          id: 9,
          user_id: 4,
          owic_number: '"YGN 056988312112"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:26:12.000000Z",
          updated_at: "2023-08-22T05:26:12.000000Z",
        },
        contract_upload: {
          id: 9,
          user_id: 4,
          pdf: "contracts\/169200116303 YIN MAR PHYO.pdf",
          contract_place: "HPA-AN",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:31:07.000000Z",
          updated_at: "2023-08-14T08:19:23.000000Z",
        },
      },
      {
        employee_info_id: 5,
        user_id: 5,
        cv_id: 23,
        passport_id: 15,
        owic_id: 10,
        contract_upload_id: 10,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: null,
        fourth_survey_id: null,
        fifth_survey_id: null,
        sixth_survey_id: null,
        seventh_survey_id: null,
        eighth_survey_id: null,
        name_en: "THAZIN",
        name_mm: "သဇင်",
        father_name_en: "MYINT SOE",
        father_name_mm: "မြင့်စိုး",
        mother_name_en: "DAW SEIN",
        mother_name_mm: "စိန်",
        gender: "female",
        dob: "1994-10-12",
        address: null,
        nrc: "၆\/ပလတ(နိုင်)၀၀၄၄၃၃၄",
        nrc_english: "6\/PALATA(N)0051515",
        religion: "ဗုဒ္ဓ",
        ethnic: "ဗမာ",
        doe_id: "0316.4\/29410(24.1.2023)",
        first_survey_permission: null,
        second_survey_permission: null,
        third_survey_permission: null,
        fourth_survey_permission: null,
        fifth_survey_permission: null,
        sixth_survey_permission: null,
        seventh_survey_permission: null,
        eighth_survey_permission: null,
        cv_result: "passed",
        cv_result_date: "2023-08-10 07:21:26",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-07T03:04:37.000000Z",
        updated_at: "2023-08-22T05:27:03.000000Z",
        doe: {
          doe_id: "0316.4\/29410(24.1.2023)",
          id: 1,
          factory_name: "Thai Union Group Public Co.,ltd",
          factory_category: "ပင်လယ်အစားအစာထုတ်လုပ်ခြင်း",
          factory_location: "Samutsakhon",
          factory_country: "Thailand",
          salary: "354",
          is_new_employee: 0,
          created_at: null,
          updated_at: null,
        },
        user: {
          id: 5,
          employee_id: "0064541MOE THAZIN",
          role: "employee",
          created_at: "2023-08-07T03:04:37.000000Z",
          updated_at: "2023-08-07T03:04:37.000000Z",
        },
        cv: {
          id: 23,
          user_id: 5,
          photo: "workerPhotos\/1691400075IMG_20230807_143402.jpg",
          address: null,
          state: null,
          weight: null,
          height: null,
          education: null,
          work_exp: null,
          has_family_list: null,
          answer_1: null,
          answer_2: null,
          phone_number: null,
          has_passport: null,
          answer_3: null,
          passport_cost: null,
          has_covid_vaccine: null,
          first_covid_vaccine_name: null,
          first_vaccinated_date: null,
          second_covid_vaccine_name: null,
          second_vaccinated_date: null,
          third_covid_vaccine_name: null,
          third_vaccinated_date: null,
          vaccinated_note: null,
          is_color_blind: null,
          is_color_blind_note: null,
          has_e_skill: null,
          has_e_skill_note: null,
          has_math_skill: null,
          has_math_skill_note: null,
          can_wait: null,
          can_wait_note: null,
          has_family_in_foreign: null,
          has_family_in_foreign_note: null,
          has_workexp_in_foreign: null,
          has_workexp_in_foreign_note: null,
          has_paid_forJob: null,
          has_paid_forJob_note: null,
          created_at: "2023-08-07T09:21:15.000000Z",
          updated_at: "2023-08-07T09:21:15.000000Z",
        },
        passport: {
          id: 15,
          user_id: 5,
          passport_number: "MF 837480255",
          passport_created_date: "23-05-2022",
          passport_expired_date: "22-05-2027",
          passport_location: "BANGKOK",
          address_english: "PALAW",
          created_at: "2023-08-14T07:11:13.000000Z",
          updated_at: "2023-08-14T07:11:13.000000Z",
        },
        owic: {
          id: 10,
          user_id: 5,
          owic_number: '"YGN 0569886565"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:27:03.000000Z",
          updated_at: "2023-08-22T05:27:03.000000Z",
        },
        contract_upload: {
          id: 10,
          user_id: 5,
          pdf: "contracts\/169200117504 MOE THA ZIN.pdf",
          contract_place: "HPA-AN",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:31:07.000000Z",
          updated_at: "2023-08-14T08:19:35.000000Z",
        },
      },
      {
        employee_info_id: 6,
        user_id: 6,
        cv_id: 2,
        passport_id: 3,
        owic_id: 11,
        contract_upload_id: 11,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: 3,
        fourth_survey_id: 5,
        fifth_survey_id: 4,
        sixth_survey_id: 2,
        seventh_survey_id: 6,
        eighth_survey_id: null,
        name_en: "WINE WINE ",
        name_mm: "ဝိုင်းဝိုင်း",
        father_name_en: "U KYAW",
        father_name_mm: "ကျော",
        mother_name_en: "DAW ",
        mother_name_mm: "အေး",
        gender: "female",
        dob: "1997-11-19",
        address: null,
        nrc: "၆\/ပလတ(နိုင်)၁၀၅၄၅၄၄",
        nrc_english: "6\/PALATA(N)104914",
        religion: "ဗုဒ္ဓ",
        ethnic: "ဗမာ",
        doe_id: "0316.4\/29410(24.1.2023)",
        first_survey_permission: null,
        second_survey_permission: null,
        third_survey_permission: 1,
        fourth_survey_permission: 1,
        fifth_survey_permission: 1,
        sixth_survey_permission: 1,
        seventh_survey_permission: 1,
        eighth_survey_permission: 1,
        cv_result: "passed",
        cv_result_date: "2023-08-10 07:21:37",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-07T03:12:56.000000Z",
        updated_at: "2023-12-11T04:09:59.000000Z",
        doe: {
          doe_id: "0316.4\/29410(24.1.2023)",
          id: 1,
          factory_name: "Thai Public Co.,ltd",
          factory_category: "ပင်လယ်အစားအစာထုတ်လုပ်ခြင်း",
          factory_location: "Samutsakhon",
          factory_country: "Thailand",
          salary: "354",
          is_new_employee: 0,
          created_at: null,
          updated_at: null,
        },
        user: {
          id: 6,
          employee_id: "104111WINE WINE CHIT AUNG",
          role: "employee",
          created_at: "2023-08-07T03:12:56.000000Z",
          updated_at: "2023-08-07T03:12:56.000000Z",
        },
        cv: {
          id: 2,
          user_id: 6,
          photo: "workerPhotos\/1691399175IMG_၂၀၂၃၀၈၀၇_၁၅၀၄၀၆.jpg",
          address: null,
          state: null,
          weight: null,
          height: null,
          education: null,
          work_exp: null,
          has_family_list: null,
          answer_1: null,
          answer_2: null,
          phone_number: null,
          has_passport: null,
          answer_3: null,
          passport_cost: null,
          has_covid_vaccine: null,
          first_covid_vaccine_name: null,
          first_vaccinated_date: null,
          second_covid_vaccine_name: null,
          second_vaccinated_date: null,
          third_covid_vaccine_name: null,
          third_vaccinated_date: null,
          vaccinated_note: null,
          is_color_blind: null,
          is_color_blind_note: null,
          has_e_skill: null,
          has_e_skill_note: null,
          has_math_skill: null,
          has_math_skill_note: null,
          can_wait: null,
          can_wait_note: null,
          has_family_in_foreign: null,
          has_family_in_foreign_note: null,
          has_workexp_in_foreign: null,
          has_workexp_in_foreign_note: null,
          has_paid_forJob: null,
          has_paid_forJob_note: null,
          created_at: "2023-08-07T09:06:15.000000Z",
          updated_at: "2023-08-07T09:06:15.000000Z",
        },
        passport: {
          id: 3,
          user_id: 6,
          passport_number: "MF 90223815121",
          passport_created_date: "2022-05-28",
          passport_expired_date: "2027-05-27",
          passport_location: "BANGKOK",
          address_english: "PALAW",
          created_at: "2023-08-07T09:57:50.000000Z",
          updated_at: "2023-08-07T09:57:50.000000Z",
        },
        owic: {
          id: 11,
          user_id: 6,
          owic_number: '"YGN 056988715152"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:27:38.000000Z",
          updated_at: "2023-08-22T05:27:38.000000Z",
        },
        contract_upload: {
          id: 11,
          user_id: 6,
          pdf: "contracts\/169200118505 WINE WINE CHIT AUNG.pdf",
          contract_place: "HPA-AN",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:31:07.000000Z",
          updated_at: "2023-08-14T08:19:45.000000Z",
        },
      },
      {
        employee_info_id: 7,
        user_id: 7,
        cv_id: 9,
        passport_id: 2,
        owic_id: 12,
        contract_upload_id: 12,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: 2,
        fourth_survey_id: 3,
        fifth_survey_id: 2,
        sixth_survey_id: 6,
        seventh_survey_id: 2,
        eighth_survey_id: null,
        name_en: "ZIN MAR",
        name_mm: "ဇင်မာ",
        father_name_en: "U MAUNG",
        father_name_mm: "မောင်ညွန့်",
        mother_name_en: "DAW AYE CHO",
        mother_name_mm: "အေးချို",
        gender: "female",
        dob: "1989-10-25",
        address: null,
        nrc: "၁၀\/မဒန(နိုင်)၁၇၅၃၄၃",
        nrc_english: "10\/MADANA(N)1751515",
        religion: "ဗုဒ္ဓ",
        ethnic: "ဗမာ",
        doe_id: "0316.4\/29410(24.1.2023)",
        first_survey_permission: null,
        second_survey_permission: null,
        third_survey_permission: 1,
        fourth_survey_permission: 1,
        fifth_survey_permission: 1,
        sixth_survey_permission: 1,
        seventh_survey_permission: 1,
        eighth_survey_permission: null,
        cv_result: "passed",
        cv_result_date: "2023-08-10 07:21:55",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-07T03:14:15.000000Z",
        updated_at: "2023-08-28T04:09:36.000000Z",
        doe: {
          doe_id: "0316.4\/29410(24.1.2023)",
          id: 1,
          factory_name: "Thai Union Group Public Co.,ltd",
          factory_category: "ပင်လယ်အစားအစာထုတ်လုပ်ခြင်း",
          factory_location: "Samutsakhon",
          factory_country: "Thailand",
          salary: "354",
          is_new_employee: 0,
          created_at: null,
          updated_at: null,
        },
        user: {
          id: 7,
          employee_id: "175091ZIN MAR OO",
          role: "employee",
          created_at: "2023-08-07T03:14:15.000000Z",
          updated_at: "2023-08-07T03:14:15.000000Z",
        },
        cv: {
          id: 9,
          user_id: 7,
          photo: "workerPhotos\/1691399571IMG_2615.jpeg",
          address: "Mudon",
          state: "မွန်",
          weight: "125",
          height: "5.3",
          education: "Grade - 10",
          work_exp: "3years",
          has_family_list: 1,
          answer_1: "Website",
          answer_2: "ဖုန်းထိုး",
          phone_number: "0979289078977",
          has_passport: 0,
          answer_3: "Tuf",
          passport_cost: "68000",
          has_covid_vaccine: 1,
          first_covid_vaccine_name: "Covidshield",
          first_vaccinated_date: "2021-07-22",
          second_covid_vaccine_name: "Covidshield",
          second_vaccinated_date: "2021-08-16",
          third_covid_vaccine_name: "Sinopharm",
          third_vaccinated_date: "2022-01-18",
          vaccinated_note: null,
          is_color_blind: 1,
          is_color_blind_note: null,
          has_e_skill: 1,
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
          created_at: "2023-08-07T09:12:51.000000Z",
          updated_at: "2023-08-07T09:12:56.000000Z",
        },
        passport: {
          id: 2,
          user_id: 7,
          passport_number: "MF 83305551551",
          passport_created_date: "2022-05-12",
          passport_expired_date: "2027-05-11",
          passport_location: "BANGKOK",
          address_english: "MUDON",
          created_at: "2023-08-07T09:56:18.000000Z",
          updated_at: "2023-08-07T09:56:18.000000Z",
        },
        owic: {
          id: 12,
          user_id: 7,
          owic_number: '"YGN 05698901202"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:28:22.000000Z",
          updated_at: "2023-08-22T05:28:22.000000Z",
        },
        contract_upload: {
          id: 12,
          user_id: 7,
          pdf: "contracts\/169200119306 ZIN MAR OO.pdf",
          contract_place: "HPA-AN",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:31:07.000000Z",
          updated_at: "2023-08-14T08:19:53.000000Z",
        },
      },
      {
        employee_info_id: 8,
        user_id: 8,
        cv_id: 54,
        passport_id: 16,
        owic_id: 13,
        contract_upload_id: 13,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: null,
        fourth_survey_id: null,
        fifth_survey_id: null,
        sixth_survey_id: null,
        seventh_survey_id: null,
        eighth_survey_id: null,
        name_en: "PHYO THU",
        name_mm: "ဖြိုးသူ",
        father_name_en: "U MAUNG MAUNG",
        father_name_mm: "မောင်မောင်",
        mother_name_en: "DAW SEIN",
        mother_name_mm: "တင်",
        gender: "female",
        dob: "1986-09-15",
        address: null,
        nrc: "၇\/မလန(နိုင်)၀၉၄၄၄၃၃",
        nrc_english: "7\/MALANA(N)0921215",
        religion: "ဗုဒ္ဓ",
        ethnic: "ဗမာ",
        doe_id: "0316.4\/29410(24.1.2023)",
        first_survey_permission: null,
        second_survey_permission: null,
        third_survey_permission: null,
        fourth_survey_permission: null,
        fifth_survey_permission: null,
        sixth_survey_permission: null,
        seventh_survey_permission: null,
        eighth_survey_permission: null,
        cv_result: "passed",
        cv_result_date: "2023-08-10 07:39:40",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-07T03:15:51.000000Z",
        updated_at: "2023-08-22T05:29:14.000000Z",
        doe: {
          doe_id: "0316.4\/29410(24.1.2023)",
          id: 1,
          factory_name: "Thai Union Group Public Co.,ltd",
          factory_category: "ပင်လယ်အစားအစာထုတ်လုပ်ခြင်း",
          factory_location: "Samutsakhon",
          factory_country: "Thailand",
          salary: "354",
          is_new_employee: 0,
          created_at: null,
          updated_at: null,
        },
        user: {
          id: 8,
          employee_id: "094547PHYO THU WIN",
          role: "employee",
          created_at: "2023-08-07T03:15:51.000000Z",
          updated_at: "2023-08-07T03:15:51.000000Z",
        },
        cv: {
          id: 54,
          user_id: 8,
          photo: null,
          address: "မင်းလှ",
          state: "ပဲခူး",
          weight: "140",
          height: "5.0",
          education: "Grade - 6",
          work_exp: "TUF ဝန်ထမ်း",
          has_family_list: 1,
          answer_1: "သူငယ်ချင်း",
          answer_2: "Viber",
          phone_number: "09682702152",
          has_passport: 1,
          answer_3: "ကိုယ်တိုင်",
          passport_cost: "85000",
          has_covid_vaccine: 1,
          first_covid_vaccine_name: "AstraZeneca",
          first_vaccinated_date: "2021-09-04",
          second_covid_vaccine_name: "AstraZeneca",
          second_vaccinated_date: "2021-12-03",
          third_covid_vaccine_name: null,
          third_vaccinated_date: null,
          vaccinated_note: null,
          is_color_blind: 1,
          is_color_blind_note: null,
          has_e_skill: 1,
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
          created_at: "2023-08-10T07:33:18.000000Z",
          updated_at: "2023-08-10T07:33:18.000000Z",
        },
        passport: {
          id: 16,
          user_id: 8,
          passport_number: "MH 4729734245",
          passport_created_date: "25-05-2023",
          passport_expired_date: "24-05-2028",
          passport_location: "BAGO",
          address_english: "MINHLA",
          created_at: "2023-08-14T07:13:42.000000Z",
          updated_at: "2023-08-14T07:13:42.000000Z",
        },
        owic: {
          id: 13,
          user_id: 8,
          owic_number: '"YGN 05698965444"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:29:14.000000Z",
          updated_at: "2023-08-22T05:29:14.000000Z",
        },
        contract_upload: {
          id: 13,
          user_id: 8,
          pdf: "contracts\/169200121907 PHYO THU WIN.pdf",
          contract_place: "PYAY",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:33:01.000000Z",
          updated_at: "2023-08-14T08:20:19.000000Z",
        },
      },
    ];
    workernum.value = fillterEmployees.value.length;
    console.log(fillterEmployees.value);

    // modal function
    let showmodal = (id) => {
      userid.value = id;
      statusindex.value = id.index;
      showModal.value = true;
    };

    const hidemodal = () => {
      showModal.value = false;
    };

    let passed = () => {
      console.log(statusindex.value);
      console.log("passed");
      console.log(fillterEmployees.value[statusindex.value].cv_result);
      fillterEmployees.value[statusindex.value].cv_result = "passed";
    };

    let failed = () => {
      console.log(statusindex.value);
      console.log("reject");
      console.log(fillterEmployees.value[statusindex.value].cv_result);
      fillterEmployees.value[statusindex.value].cv_result = "failed";
    };

    let pending = () => {
      console.log(statusindex.value);
      console.log("pending");
      console.log(fillterEmployees.value[statusindex.value].cv_result);
      fillterEmployees.value[statusindex.value].cv_result = "pending";
    };

    //Filter Function
    let getfilter = async (value) => {
      console.log(filterStatus.value);
      if (filterStatus.value === value) {
        filterStatus.value = null;
        fillterEmployees.value = null;
      } else {
        filterStatus.value = value;
        fillterEmployees.value = fillterEmployees.value.data.filter(
          (employee) => {
            if (doeId.value && employee.doe !== null) {
              return (
                (employee.doe.doe_id == doeId.value) &
                (employee.cv_result == value)
              );
            } else {
              return employee.cv_result == value;
            }
          }
        );
      }
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
      employees,
      doeId,
      fillterEmployees,
      showModal,
      showmodal,
      hidemodal,
      userid,
      passed,
      failed,
      pending,
      statusindex,
      getfilter,
      workernum,
      filterStatus,
      reloadTable,
      reload,
    };
  },
};
</script>

<style></style>
