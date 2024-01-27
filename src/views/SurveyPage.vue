<template>
  <SuveryModal
    class="border"
    v-if="showModal && surveyNumber == 'first'"
    :data="data"
    @closeModal="hidemodal"
  ></SuveryModal>
  <SuveryModal2
    v-if="showModal && surveyNumber == 'second'"
    :data="data"
    @closeModal="hidemodal"
  ></SuveryModal2>
  <SuveryModal3
    v-if="showModal && surveyNumber == 'third'"
    :data="data"
    @closeModal="hidemodal"
  ></SuveryModal3>
  <SuveryModal4
    v-if="showModal && surveyNumber == 'fourth'"
    :data="data"
    @closeModal="hidemodal"
  ></SuveryModal4>
  <SuveryModal5
    v-if="showModal && surveyNumber == 'fifth'"
    :data="data"
    @closeModal="hidemodal"
  ></SuveryModal5>
  <SuveryModal6
    v-if="showModal && surveyNumber == 'sixth'"
    :data="data"
    @closeModal="hidemodal"
  ></SuveryModal6>
  <SuveryModal7
    v-if="showModal && surveyNumber == 'seventh'"
    :data="data"
    @closeModal="hidemodal"
  ></SuveryModal7>
  <SuveryModal8
    v-if="showModal && surveyNumber == 'eighth'"
    :data="data"
    @closeModal="hidemodal"
  ></SuveryModal8>
  <div class="bg-light mains" :class="bgactive === true ? 'red' : 'blue'">
    <SuccessModal v-if="successModal" />

    <!-- alert -->
    <div v-if="errorMessage" class="errorMessage">
      <div class="error-message">
        <div class="modalss">
          <img
            src="http://100dayscss.com/codepen/alert.png"
            width="44"
            height="38"
          />
          <span class="title">ops !</span>
          <p class="my-2">{{ errorMessage }}</p>
          <button class="btn btn-danger" @click="closemessage">Close</button>
        </div>
      </div>
    </div>
    <!-- top navbar -->
    <Navbar></Navbar>
    <!-- <LoadingPage v-if="loading" /> -->
    <div class="">
      <div class="container border border-primary">
        <div class="col-12">
          <div class="p-5">
            <div class="row">
              <!-- chose DOE Num -->
              <div class="form-group col-3">
                <label for="doenum">DOE Number</label>
                <select
                  class="form-select bg-light"
                  id="doenum"
                  v-model="doeId"
                >
                  <option>0316.4\/25513(20.1.2023)</option>
                  <option>02514\/25513(30.1.2023)</option>
                  <option>03185\/25513(10.1.2023)</option>
                </select>
              </div>

              <div class="form-group col-9">
                <!-- <button class="btn btn-primary mt-5 mb-3" @click="suveryapi">View Survey Result</button> -->

                <div class="">
                  <label class="">Suvery Form</label>
                  <div class="d-flex">
                    <select
                      class="form-select"
                      aria-label="Default select example"
                      v-model="surveyNumber"
                    >
                      <option selected>Open this select menu</option>
                      <option value="first">(Suvery 1)</option>
                      <option value="second">(Suvery 2)</option>
                      <option value="third">(Suvery 3)</option>
                      <option value="fourth">(Suvery 4)</option>
                      <option value="fifth">(Suvery 5)</option>
                      <option value="sixth">(Suvery 6)</option>
                      <option value="seventh">(Suvery 7)</option>
                      <option value="eighth">(Suvery 8)</option>
                    </select>
                    <button class="sends ms-2" @click="sendData">
                      <font-awesome-icon icon="fa-solid fa-arrow-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Worker Table -->
            <div class="mt-5 me-3">
              <h6>Workers Info</h6>
              <div>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th>
                        <input
                          type="checkbox"
                          v-model="allEmployees"
                          @change="selectedallEmployee"
                        />
                      </th>
                      <th scope="col">No</th>
                      <th scope="col">Worker ID</th>
                      <th scope="col">Name(En)</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Birth of Date</th>
                      <th scope="col">State</th>
                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tbody
                    v-for="(employees, index) in fillterEmployees"
                    :key="employees.id"
                  >
                    <tr class="">
                      <td>
                        <input
                          type="checkbox"
                          v-model="selectedEmployees"
                          :value="employees.user.employee_id"
                          @change="selectNum"
                        />
                      </td>
                      <th scope="row">{{ index + 1 }}</th>
                      <td>{{ employees.user.employee_id }}</td>
                      <td>{{ employees.name_en }}</td>
                      <td>{{ employees.gender }}</td>
                      <td>{{ employees.dob }}</td>
                      <td v-if="employees.cv">{{ employees.cv.state }}</td>
                      <td v-if="employees.cv == null" class="text-danger">
                        No Data
                      </td>
                      <td
                        v-if="
                          employees.first_survey_id && surveyNumber == 'first'
                        "
                        class="text-center"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-up-right-from-square"
                          @click="showmodal(employees.first_survey_id)"
                        />
                      </td>
                      <td
                        v-if="
                          employees.second_survey_id && surveyNumber == 'second'
                        "
                        class="text-center"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-up-right-from-square"
                          @click="showmodal(employees.second_survey_id)"
                        />
                      </td>
                      <td
                        v-if="
                          employees.third_survey_id && surveyNumber == 'third'
                        "
                        class="text-center"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-up-right-from-square"
                          @click="showmodal(employees.third_survey_id)"
                        />
                      </td>
                      <td
                        v-if="
                          employees.fourth_survey_id && surveyNumber == 'fourth'
                        "
                        class="text-center"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-up-right-from-square"
                          @click="showmodal(employees.fourth_survey_id)"
                        />
                      </td>
                      <td
                        v-if="
                          employees.fifth_survey_id && surveyNumber == 'fifth'
                        "
                        class="text-center"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-up-right-from-square"
                          @click="showmodal(employees.fifth_survey_id)"
                        />
                      </td>
                      <td
                        v-if="
                          employees.sixth_survey_id && surveyNumber == 'sixth'
                        "
                        class="text-center"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-up-right-from-square"
                          @click="showmodal(employees.sixth_survey_id)"
                        />
                      </td>
                      <td
                        v-if="
                          employees.seventh_survey_id &&
                          surveyNumber == 'seventh'
                        "
                        class="text-center"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-up-right-from-square"
                          @click="showmodal(employees.seventh_survey_id)"
                        />
                      </td>
                      <td
                        v-if="
                          employees.eighth_survey_id && surveyNumber == 'eighth'
                        "
                        class="text-center"
                      >
                        <font-awesome-icon
                          icon="fa-solid fa-arrow-up-right-from-square"
                          @click="showmodal(employees.eighth_survey_id)"
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
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
import SuveryModal from "../components/SuveryModal.vue";
import SuveryModal2 from "../components/SuveryModal2.vue";
import SuveryModal3 from "../components/SuveryModal3.vue";
import SuveryModal4 from "../components/SuveryModal4.vue";
import SuveryModal5 from "../components/SuveryModal5.vue";
import SuveryModal6 from "../components/SuveryModal6.vue";
import SuveryModal7 from "../components/SuveryModal7.vue";
import SuveryModal8 from "../components/SuveryModal8.vue";
import SuccessModal from "../components/SuccessModal.vue";
import LoadingPage from "../components/LoadingPage.vue";
import Navbar from "../components/Navbar.vue";
export default {
  components: {
    Navbar,
    SuveryModal,
    SuveryModal2,
    SuveryModal3,
    SuveryModal4,
    SuveryModal5,
    SuveryModal6,
    SuveryModal7,
    SuveryModal8,
    SuccessModal,
    LoadingPage,
  },
  setup() {
    let store = useStore();
    let router = useRouter();
    let doeId = ref();
    let fillterEmployees = ref();
    let allEmployees = ref(false);
    let selectedEmployees = ref([]);
    let surveyNumber = ref();
    let showModal = ref(false);
    let data = ref();
    let errorMessage = ref(null);
    let bgactive = ref(false);
    let successModal = ref(false);
    let useraccount = ref(localStorage.getItem("useraccount"));
    let loading = ref(true);

    const logoutFunction = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userid");
      router.push("/");
    };

    // get DOE Data
    let does = computed(() => {
      return store.state.doeModule.does;
    });

    let loadingFun = () => {
      setTimeout(() => {
        loading.value = false;
      }, 2000);
    };

    loadingFun();

    // get DOE Data
    let employees = [
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
        name_en: "AYE AYE PHOAE",
        name_mm: "အေးအေးပြုံး",
        father_name_en: "U MYINT",
        father_name_mm: "ဦးမြင့်",
        mother_name_en: "DAW THEIN CHIT",
        mother_name_mm: "သိန်းချစ်",
        gender: "female",
        dob: "1987-09-04",
        address: null,
        nrc: "၆\/လလန(နိုင်)၀၉၈၀၅၄",
        nrc_english: "6\/LALANA(N)098054",
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
          id: 2,
          employee_id: "098054AYE AYE PHOAE",
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
          passport_number: "MF 837587",
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
          owic_number: '"YGN 0569879"',
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
        father_name_en: "U THAN TUN",
        father_name_mm: "သန်းထွန်း",
        mother_name_en: "DAW THAN HTWE",
        mother_name_mm: "သန်းထွေး",
        gender: "female",
        dob: "1991-03-24",
        address: null,
        nrc: "၁၀\/ပမန(နိုင်)၂၁၄၀၇၁",
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
          address: "ပေါင်ကျြွဲခံ",
          state: "မွန်",
          weight: "100",
          height: "5.2",
          education: "Grade - 4",
          work_exp: "11",
          has_family_list: 1,
          answer_1: "အမတွေဆီကသိပါတယ်",
          answer_2: "အမဆက်သွယ်ပေးပါတယ်",
          phone_number: "09676824529",
          has_passport: 1,
          answer_3: "TUF",
          passport_cost: "68000TUFစက်ရုံကပေးပါသည်",
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
          owic_number: '"YGN 0569881"',
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
        name_en: "YIN MAR PHYO",
        name_mm: "ရင်မာဖြိုး",
        father_name_en: "U MYINT SOE",
        father_name_mm: "မြင့်စိုး",
        mother_name_en: "DAW AYE WIN",
        mother_name_mm: "အေးဝင်း",
        gender: "female",
        dob: "1994-11-02",
        address: null,
        nrc: "၆\/ပလန(နိုင်)၁၂၄၇၇၉",
        nrc_english: "6\/PALANA(N)124779",
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
          phone_number: "09262786157",
          has_passport: 0,
          answer_3: "ထိုင်းမှာလုပ်ခဲ့သည်",
          passport_cost: "68000 TUFစက်ရုံကပေးသည်",
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
          passport_number: "MF 837525",
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
          owic_number: '"YGN 0569883"',
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
        name_en: "MOE THAZIN",
        name_mm: "မိုးသဇင်",
        father_name_en: "MYINT SOE",
        father_name_mm: "မြင့်စိုး",
        mother_name_en: "DAW SEIN THAN",
        mother_name_mm: "စိန်သန်း",
        gender: "female",
        dob: "1994-10-12",
        address: null,
        nrc: "၆\/ပလတ(နိုင်)၀၀၆၁၁၉",
        nrc_english: "6\/PALATA(N)006119",
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
          employee_id: "006119MOE THAZIN",
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
          passport_number: "MF 837480",
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
          owic_number: '"YGN 0569886"',
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
        name_en: "WINE WINE CHIT AUNG",
        name_mm: "ဝိုင်းဝိုင်းချစ်အောင်",
        father_name_en: "U KYAW HTAY",
        father_name_mm: "ကျော်ဌေး",
        mother_name_en: "DAW AYESI",
        mother_name_mm: "အေးစီ",
        gender: "female",
        dob: "1997-11-19",
        address: null,
        nrc: "၆\/ပလတ(နိုင်)၁၀၄၉၁၄",
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
          id: 6,
          employee_id: "104914WINE WINE CHIT AUNG",
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
          passport_number: "MF 902238",
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
          owic_number: '"YGN 0569887"',
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
        name_en: "ZIN MAR OO",
        name_mm: "ဇင်မာဦး",
        father_name_en: "U MAUNG NYUNT",
        father_name_mm: "မောင်ညွန့်",
        mother_name_en: "DAW AYE CHO",
        mother_name_mm: "အေးချို",
        gender: "female",
        dob: "1989-10-25",
        address: null,
        nrc: "၁၀\/မဒန(နိုင်)၁၇၅၀၉၁",
        nrc_english: "10\/MADANA(N)175091",
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
          phone_number: "09792890777",
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
          passport_number: "MF 833055",
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
          owic_number: '"YGN 0569890"',
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
        name_en: "PHYO THU WIN",
        name_mm: "ဖြိုးသူဝင်း",
        father_name_en: "U MAUNG MAUNG AYE",
        father_name_mm: "မောင်မောင်အေး",
        mother_name_en: "DAW TIN SEIN",
        mother_name_mm: "တင်စိန်",
        gender: "female",
        dob: "1986-09-15",
        address: null,
        nrc: "၇\/မလန(နိုင်)၀၉၄၅၄၇",
        nrc_english: "7\/MALANA(N)094547",
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
          passport_number: "MH 472973",
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
          owic_number: '"YGN 0569896"',
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
      {
        employee_info_id: 9,
        user_id: 9,
        cv_id: 26,
        passport_id: 17,
        owic_id: 14,
        contract_upload_id: 14,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: null,
        fourth_survey_id: null,
        fifth_survey_id: null,
        sixth_survey_id: null,
        seventh_survey_id: null,
        eighth_survey_id: null,
        name_en: "NYO MAR LWIN",
        name_mm: "ညိုမာလွင်",
        father_name_en: "U THAN MAUNG",
        father_name_mm: "သန်း‌မောင်",
        mother_name_en: "DAW SAN SAN MYINT",
        mother_name_mm: "စန်းစန်းမြင့်",
        gender: "female",
        dob: "1991-06-09",
        address: null,
        nrc: "၇\/မလန(နိုင်)၁၀၅၄၄၇",
        nrc_english: "7\/MALANA(N)105447",
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
        cv_result_date: "2023-08-10 07:38:55",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-07T03:17:08.000000Z",
        updated_at: "2023-08-22T05:29:58.000000Z",
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
          id: 9,
          employee_id: "105447NYO MAR LWIN",
          role: "employee",
          created_at: "2023-08-07T03:17:08.000000Z",
          updated_at: "2023-08-07T03:17:08.000000Z",
        },
        cv: {
          id: 26,
          user_id: 9,
          photo: "workerPhotos\/1691400106IMG20230807143619.jpg",
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
          created_at: "2023-08-07T09:21:46.000000Z",
          updated_at: "2023-08-07T09:21:46.000000Z",
        },
        passport: {
          id: 17,
          user_id: 9,
          passport_number: "MH 472970",
          passport_created_date: "25-05-2023",
          passport_expired_date: "24-05-2028",
          passport_location: "BAGO",
          address_english: "MINHLA",
          created_at: "2023-08-14T07:14:36.000000Z",
          updated_at: "2023-08-14T07:14:36.000000Z",
        },
        owic: {
          id: 14,
          user_id: 9,
          owic_number: '"YGN 0569893"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:29:58.000000Z",
          updated_at: "2023-08-22T05:29:58.000000Z",
        },
        contract_upload: {
          id: 14,
          user_id: 9,
          pdf: "contracts\/169200123108 NYO MAR LWIN.pdf",
          contract_place: "PYAY",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:33:01.000000Z",
          updated_at: "2023-08-14T08:20:31.000000Z",
        },
      },
      {
        employee_info_id: 10,
        user_id: 10,
        cv_id: 55,
        passport_id: 5,
        owic_id: 15,
        contract_upload_id: 15,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: 8,
        fourth_survey_id: 6,
        fifth_survey_id: 5,
        sixth_survey_id: 4,
        seventh_survey_id: 5,
        eighth_survey_id: null,
        name_en: "MUYAR PHYO",
        name_mm: "မူယာဖြိုး",
        father_name_en: "U KYI LIN",
        father_name_mm: "ကြည်လင်း",
        mother_name_en: "DAW SAN AYE",
        mother_name_mm: "စန်းအေး",
        gender: "female",
        dob: "1993-03-29",
        address: null,
        nrc: "၇\/မလန(နိုင်)၁၂၆၄၄၁",
        nrc_english: "7\/MALANA(N)126441",
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
        cv_result_date: "2023-08-10 07:39:03",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-07T03:18:25.000000Z",
        updated_at: "2023-12-11T03:53:08.000000Z",
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
          id: 10,
          employee_id: "126441MUYAR PHYO",
          role: "employee",
          created_at: "2023-08-07T03:18:25.000000Z",
          updated_at: "2023-08-07T03:18:25.000000Z",
        },
        cv: {
          id: 55,
          user_id: 10,
          photo: null,
          address: "မင်းလှမြို့နယ်",
          state: "ပဲခူး",
          weight: "120",
          height: "5.3",
          education: "Grade - 7",
          work_exp: "TUFဝန်ထမ်း",
          has_family_list: 1,
          answer_1: "သူငယ်ချင်း",
          answer_2: "Viber",
          phone_number: "9682701793",
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
          created_at: "2023-08-10T07:37:54.000000Z",
          updated_at: "2023-08-10T07:37:54.000000Z",
        },
        passport: {
          id: 5,
          user_id: 10,
          passport_number: "MH 472974",
          passport_created_date: "2023-05-25",
          passport_expired_date: "2028-05-24",
          passport_location: "BAGO",
          address_english: "MINHLA",
          created_at: "2023-08-07T09:59:16.000000Z",
          updated_at: "2023-08-07T09:59:16.000000Z",
        },
        owic: {
          id: 15,
          user_id: 10,
          owic_number: '"YGN 0569892"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:30:35.000000Z",
          updated_at: "2023-08-22T05:30:35.000000Z",
        },
        contract_upload: {
          id: 15,
          user_id: 10,
          pdf: "contracts\/169200125609 MUYAR PHYO.pdf",
          contract_place: "PYAY",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:33:01.000000Z",
          updated_at: "2023-08-14T08:20:56.000000Z",
        },
      },
      {
        employee_info_id: 11,
        user_id: 11,
        cv_id: 31,
        passport_id: 6,
        owic_id: 16,
        contract_upload_id: 16,
        first_survey_id: null,
        second_survey_id: null,
        third_survey_id: 7,
        fourth_survey_id: 7,
        fifth_survey_id: 6,
        sixth_survey_id: 5,
        seventh_survey_id: 4,
        eighth_survey_id: null,
        name_en: "NWAY ZIN HTET",
        name_mm: "နွေဇင်ထက်",
        father_name_en: "U HAN THEIN",
        father_name_mm: "ဟန်သိန်း",
        mother_name_en: "DAW WIN YEE",
        mother_name_mm: "ဝင်းရီ",
        gender: "female",
        dob: "1998-04-28",
        address: null,
        nrc: "၇\/မလန(နိုင်)၁၁၇၆၀၁",
        nrc_english: "7\/MALANA(N)117601",
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
        cv_result_date: "2023-08-10 07:39:22",
        worker_result: "passed",
        worker_result_date: "2023-08-10 07:51:56",
        medical_result: "passed",
        medical_result_date: "2023-08-10 07:58:35",
        worker_result_note: null,
        medical_result_note: null,
        created_at: "2023-08-07T03:19:45.000000Z",
        updated_at: "2023-12-11T03:55:29.000000Z",
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
          id: 11,
          employee_id: "117601NWAY ZIN HTET",
          role: "employee",
          created_at: "2023-08-07T03:19:45.000000Z",
          updated_at: "2023-08-07T03:19:45.000000Z",
        },
        cv: {
          id: 31,
          user_id: 11,
          photo: "workerPhotos\/1691400288IMG20230807143623.jpg",
          address: "ပဲခူးတိုင်းမင်းလှမြို့နယ်",
          state: "ပဲခူး",
          weight: "90",
          height: "5.2",
          education: "Grade - 5",
          work_exp: "ထိုင်နိုင်ငံမှာအလုပ်လုပ်ပါသည်",
          has_family_list: 1,
          answer_1: "သူငယ်ချင်းမှတဆင်သိပါသည်",
          answer_2: "Phဖြင့်ဆက်သွယ်ခဲသည်",
          phone_number: "၆၈၂၆၄၅၇၄၀",
          has_passport: 1,
          answer_3: "ပဲခူးမြို့မှာလုပ်ခဲသည်",
          passport_cost: "၈၅၀၀၀",
          has_covid_vaccine: 1,
          first_covid_vaccine_name: "Covidshield",
          first_vaccinated_date: "2021-09-04",
          second_covid_vaccine_name: "Covidshield",
          second_vaccinated_date: "2021-12-04",
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
          created_at: "2023-08-07T09:24:48.000000Z",
          updated_at: "2023-08-07T09:24:50.000000Z",
        },
        passport: {
          id: 6,
          user_id: 11,
          passport_number: "MH 472971",
          passport_created_date: "2023-05-25",
          passport_expired_date: "2028-05-24",
          passport_location: "BAGO",
          address_english: "MINHLA",
          created_at: "2023-08-07T10:00:02.000000Z",
          updated_at: "2023-08-07T10:00:02.000000Z",
        },
        owic: {
          id: 16,
          user_id: 11,
          owic_number: '"YGN 0569895"',
          owic_created_date: "8-8-2023",
          owic_created_place: "yangon",
          training_start_date: "7-8-2023",
          departure_date: "23-8-2023",
          created_at: "2023-08-22T05:31:06.000000Z",
          updated_at: "2023-08-22T05:31:06.000000Z",
        },
        contract_upload: {
          id: 16,
          user_id: 11,
          pdf: "contracts\/169200126810 NWAY ZIN HTET.pdf",
          contract_place: "PYAY",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:33:01.000000Z",
          updated_at: "2023-08-14T08:21:08.000000Z",
        },
      },
    ];

    let getdoeId = (id) => {
      fillterEmployees.value = employees;
    };

    getdoeId();

    let selectedallEmployee = () => {
      if (allEmployees.value == true) {
        selectedEmployees.value = [];
        console.log(fillterEmployees.value);
        fillterEmployees.value.forEach((allemployee) => {
          selectedEmployees.value.push(allemployee.employee_id);
        });
      } else {
        selectedEmployees.value = [];
      }
    };
    // Permission
    let sendData = async () => {
      console.log(surveyNumber.value);
      let data = {
        employee_id: selectedEmployees.value,
      };
      console.log(data);

      // console.log(res.data);
    };

    let suveryapi = async () => {
      console.log(res.data);
      employees = res.data;
      console.log(employees);
    };

    let showmodal = (id) => {
      console.log(id);
      data.value = {
        id,
        suvery: surveyNumber.value,
      };
      console.log(data.value);
      showModal.value = true;
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
      showModal.value = false;
    };

    let closemessage = () => {
      errorMessage.value = "";
    };

    return {
      does,
      doeId,
      getdoeId,
      fillterEmployees,
      allEmployees,
      selectedEmployees,
      selectedallEmployee,
      surveyNumber,
      sendData,
      showModal,
      showmodal,
      hidemodal,
      data,
      suveryapi,
      useraccount,
      logoutFunction,
      successModal,
      showSuccess,
      errorMessage,
      closemessage,
      bgactive,
      hideSuccess,
      loading,
    };
  },
};
</script>

<style>
.suveryContainer {
  background: rgb(224, 220, 220);
  width: 80%;
  height: 100vh;

  display: flex;
  align-items: center;
  flex-direction: column;
}

.suveryContainer .btn {
  width: 80%;
}

.formContainer {
  width: 80%;
}

.formContainer p {
  margin: 0;
}

.border {
  margin-top: 3rem;
  border-radius: 15px;
}

.sends {
  width: 50px;
  height: 35x;
  border: none;
  background: #007bff;
  border-radius: 4px;
  /* transition: 0.3s; */
}

.sends:hover {
  transform: scale(0.95);
}

.sends:active {
  transform: scale(1.02);
}
</style>
