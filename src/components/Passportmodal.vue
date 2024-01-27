<template>
  <div class="cvModal bg-white">
    <!-- <LoadingPage v-if="!employees"/> -->
    <div class="cv px-5">
      <SuccessModal class="modalfix" v-if="successModal" />
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
            <button class="btn btn-danger" @click="errorMessage = null">
              Close
            </button>
          </div>
        </div>
      </div>
      <div class="modalHeader text-center pt-2">
        <h3 class="">Passport Information</h3>
        <button
          type="button"
          class="close"
          data-dismiss="modal"
          aria-label="Close"
          @click="$emit('closeModal')"
        >
          <span class="text-dark">&times;</span>
        </button>
      </div>

      <div v-if="employees" class="modalBody">
        <!-- Personal Information -->
        <div>
          <h5 class="text-primary py-2">Personal Information</h5>
          <div class="d-flex justify-content-between align-items-center bolds">
            <div class="">
              <p>Worker ID</p>
              <p>{{ employees.data.employee_id }}</p>
            </div>

            <div class="">
              <p>Name (En)</p>
              <p>{{ employees.data.employee_info.name_en }}</p>
            </div>

            <div class="">
              <p>NRC Number</p>
              <p>{{ employees.data.employee_info.nrc }}</p>
            </div>

            <div class="">
              <p>DOE Number</p>
              <p>{{ employees.data.doe.doe_id }}</p>
            </div>

            <div class="">
              <p>Father Name (En)</p>
              <p>{{ employees.data.employee_info.father_name_en }}</p>
            </div>
          </div>
        </div>
        <!-- Contract Upload Information -->
        <h5 class="text-primary py-2">Contract Upload Information</h5>
        <div v-if="employees.data.passport_data && !edit" class="row bolds">
          <div class="col-12 col-lg-5">
            <p>Address</p>
            <p class="address bg-light">
              {{ employees.data.passport_data.address_english }}
            </p>
          </div>

          <div class="col-12 col-lg-7">
            <div class="row">
              <div class="col-6 py-5">
                <p>Passport Number</p>
                <p>{{ employees.data.passport_data.passport_number }}</p>
              </div>

              <!-- Contract Date -->
              <div class="form-group col-6 py-3">
                <p>Passport Created Date</p>
                <p>{{ employees.data.passport_data.passport_created_date }}</p>
              </div>

              <!-- Contract Date -->
              <div class="col-6 py-3">
                <p>Passport Location</p>
                <p>{{ employees.data.passport_data.passport_location }}</p>
              </div>

              <!-- Contract Date -->
              <div class="form-group col-6 py-3">
                <p>Passport Expired Date</p>
                <p>{{ employees.data.passport_data.passport_expired_date }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="row">
          <div class="col-12 col-lg-5">
            <label for="address" class="d-block">Address</label>
            <textarea
              type="text"
              class="address bg-light border border-dark"
              id="address"
              v-model="address"
            ></textarea>
          </div>

          <div class="col-12 col-lg-7">
            <div class="row">
              <div class="col-6 py-3">
                <label for="passport" class="d-block">Passport Number</label>
                <input
                  type="text"
                  class="form-control"
                  name="passport"
                  id="passport"
                  v-model="passport"
                />
              </div>

              <!-- Contract Date -->
              <div class="form-group col-6 py-3">
                <label for="passportcreateDate" class="d-block"
                  >Passport Created Date</label
                >
                <div class="dateContainer form-control">
                  <input
                    type="text"
                    maxlength="2"
                    placeholder="DD"
                    class="datecss"
                    v-model="day"
                    @input="insertDate"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    maxlength="2"
                    placeholder="MM"
                    class="datecss"
                    v-model="month"
                    @input="insertDate"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    maxlength="4"
                    placeholder="YYYY"
                    class="datecss"
                    v-model="year"
                    @input="insertDate"
                  />
                </div>
              </div>

              <!-- Contract Date -->
              <div class="col-6 py-3">
                <label for="passportlocation" class="d-block"
                  >Passport Created Location</label
                >
                <input
                  type="text"
                  class="form-control"
                  name="passportlocation"
                  id="passportlocation"
                  v-model="passportlocation"
                />
              </div>

              <!-- Contract Date -->
              <div class="form-group col-6 py-3">
                <label for="passportexpiredDate" class="d-block"
                  >Passport Expired Date</label
                >
                <div class="dateContainer form-control">
                  <input
                    type="text"
                    maxlength="2"
                    placeholder="DD"
                    class="datecss"
                    v-model="expireday"
                    @input="insertDatetwo"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    maxlength="2"
                    placeholder="MM"
                    class="datecss"
                    v-model="expiremonth"
                    @input="insertDatetwo"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    maxlength="4"
                    placeholder="YYYY"
                    class="datecss"
                    v-model="expireyear"
                    @input="insertDatetwo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Btn Container -->
        <div
          v-if="employees.data.passport_data && !edit"
          class="d-flex justify-content-center my-2"
        >
          <button class="btn reject mx-2 oneBtn" @click="editData">
            <span>Edit</span>
          </button>
        </div>

        <div
          v-else-if="!employees.data.passport_data"
          class="d-flex justify-content-center my-2"
        >
          <!-- <button class="btn reject mx-2 oneBtn" @click="close"><span class="text-danger" >Cancel</span></button> -->
          <button class="btn accept mx-2 oneBtn" @click="handleSubmit">
            <span>Confirm</span>
          </button>
        </div>

        <div v-if="edit" class="d-flex justify-content-center my-2">
          <button class="btn btn-outline-danger mx-2 oneBtn" @click="cancel">
            <span>Cancel</span>
          </button>
          <button class="btn btn-outline-success mx-2 oneBtn" @click="update">
            <span>Update</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import { useRouter } from "vue-router";
import SuccessModal from "./SuccessModal.vue";
import LoadingPage from "../components/LoadingPage.vue";
export default {
  props: ["id"],
  components: { SuccessModal, LoadingPage },
  setup(props, { emit }) {
    let store = useStore();
    let router = useRouter();
    let address = ref();
    let passport = ref();
    let passportcreateDate = ref();
    let passportlocation = ref();
    let passportexpiredDate = ref();
    let owicdata = ref();
    let edit = ref(false);
    let errorMessage = ref(null);
    let successModal = ref(false);
    let day = ref();
    let month = ref();
    let year = ref();
    let expireday = ref();
    let expiremonth = ref();
    let expireyear = ref();

    //   get employee

    let employees = {
      data: {
        employee_id: "124779YIN MAR PHYO",
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
        employee_info: {
          user_id: 4,
          name_mm: "ရင်မာဖြိုး",
          name_en: "YIN MAR PHYO",
          father_name_mm: "မြင့်စိုး",
          mother_name_en: "DAW AYE WIN",
          mother_name_mm: "အေးဝင်း",
          father_name_en: "U MYINT SOE",
          gender: "female",
          dob: "1994-11-02",
          nrc: "၆\/ပလန(နိုင်)၁၂၄၇၇၉",
          cv_result: "passed",
          cv_result_date: "2023-08-10 07:21:03",
          worker_result: "passed",
          worker_result_note: null,
          worker_result_date: "2023-08-10 07:51:56",
          medical_result: "passed",
          medical_result_note: null,
          medical_result_date: "2023-08-10 07:58:35",
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
          third_survey_id: 4,
          fourth_survey_id: 4,
          fifth_survey_id: 3,
          sixth_survey_id: 3,
          seventh_survey_id: 7,
          eighth_survey_id: null,
        },
        cv_data: {
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
        passport_data: {
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
        owic_data: {
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
        contrat_upload_data: {
          id: 9,
          user_id: 4,
          pdf: "contracts\/169200116303 YIN MAR PHYO.pdf",
          contract_place: "HPA-AN",
          contract_date: "16-06-2023",
          created_at: "2023-08-14T07:31:07.000000Z",
          updated_at: "2023-08-14T08:19:23.000000Z",
        },
      },
    };

    console.log(employees);

    let insertDate = () => {
      passportcreateDate.value = `${day.value}-${month.value}-${year.value}`;
      console.log(passportcreateDate.value);
    };

    let insertDatetwo = () => {
      passportexpiredDate.value = `${expireday.value}-${expiremonth.value}-${expireyear.value}`;
      console.log(passportexpiredDate.value);
    };

    let handleSubmit = async () => {
      let data = {
        user_id: props.id,
        passport_number: passport.value,
        passport_created_date: passportcreateDate.value,
        passport_expired_date: passportexpiredDate.value,
        passport_location: passportlocation.value,
        address_english: address.value,
      };

      console.log(data);
    };

    let editData = () => {
      address.value = employees.data.passport_data.address_english;
      passport.value = employees.data.passport_data.passport_number;
      passportcreateDate.value =
        employees.data.passport_data.passport_created_date.split("-");
      day.value = passportcreateDate.value[0];
      month.value = passportcreateDate.value[1];
      year.value = passportcreateDate.value[2];
      passportlocation.value = employees.data.passport_data.passport_location;
      passportexpiredDate.value =
        employees.data.passport_data.passport_expired_date.split("-");
      expireday.value = passportexpiredDate.value[0];
      expiremonth.value = passportexpiredDate.value[1];
      expireyear.value = passportexpiredDate.value[2];
      edit.value = true;
    };

    let update = async () => {
      console.log(props.id);
      insertDate();
      insertDatetwo();
      let data = {
        user_id: props.id,
        passport_number: passport.value,
        passport_created_date: passportcreateDate.value,
        passport_expired_date: passportexpiredDate.value,
        passport_location: passportlocation.value,
        address_english: address.value,
      };
      // props.id.id = data;
    };

    let cancel = () => {
      edit.value = false;
    };

    let showSuccess = () => {
      successModal.value = true;
      bgactive.value = true;
    };

    return {
      employees,
      address,
      passport,
      passportcreateDate,
      passportexpiredDate,
      passportlocation,
      handleSubmit,
      owicdata,
      cancel,
      edit,
      editData,
      update,
      successModal,
      showSuccess,
      errorMessage,
      insertDate,
      day,
      month,
      year,
      expireday,
      expiremonth,
      expireyear,
      insertDatetwo,
    };
  },
};
</script>

<style>
.address {
  width: 350px;
  height: 250px;
  padding-left: 20px;
  padding-top: 10px;
}

.date {
  /* width: 300px; */
  -webkit-appearance: none;
  font-size: 18px;
  text-align: center;
  letter-spacing: 2px;
  padding-right: 10px;
  border-radius: 8px;
}

.messageerror {
  width: 100vw;
  height: 100vh;
  font-weight: bold;
  font-size: 18px;
  padding: 30px 20px;
  transition: 1s;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(121, 9, 9, 0.36458333333333337) 100%,
    rgba(0, 212, 255, 1) 100%
  );

  position: absolute;
  top: 0;
  left: 0;

  z-index: 100;
}

.modalfix {
  position: fixed;
  top: 50%;
  left: 50%;

  border: 3px solid #077bff;
}
</style>
