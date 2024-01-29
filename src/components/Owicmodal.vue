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
        <h3 class="">Worker OWIC Number Details</h3>
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
        <h5 class="text-primary">OWIC Data</h5>
        <div v-if="employees.data.owic_data && !edit" class="row bolds">
          <div class="mx-auto col-12">
            <div class="row">
              <div class="col-3">
                <p>Owic Number</p>
                <p>{{ employees.data.owic_data.owic_number }}</p>
              </div>

              <!-- Contract Date -->
              <div class="col-3">
                <p>Owic Created Date</p>
                <p>{{ employees.data.owic_data.owic_created_date }}</p>
              </div>

              <!-- Contract Date -->
              <div class="col-3">
                <p>Owic Created Place</p>
                <p>{{ employees.data.owic_data.owic_created_place }}</p>
              </div>

              <!-- Contract Date -->
              <div class="col-3">
                <p>Training Start Date</p>
                <p>{{ employees.data.owic_data.training_start_date }}</p>
              </div>

              <!-- Contract Date -->
              <div class="col-3">
                <p>Depature Date</p>
                <p>{{ employees.data.owic_data.departure_date }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="row">
          <div class="mx-auto col-7">
            <div class="row">
              <div class="col-6 pb-3 py-3">
                <label for="owic" class="d-block">Owic Number</label>
                <input
                  type="text"
                  class="form-control"
                  name="owic"
                  id="owic"
                  v-model="owicnum"
                />
              </div>

              <!-- Contract Date -->
              <div class="form-group col-6 pb-3">
                <label for="passportcreateDate" class="d-block"
                  >Owic Created Date</label
                >
                <div class="dateContainer form-control">
                  <input
                    type="text"
                    maxlength="2"
                    placeholder="DD"
                    class="datecss"
                    v-model="day"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    maxlength="2"
                    placeholder="MM"
                    class="datecss"
                    v-model="month"
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
              <div class="form-group col-6 py-3">
                <label for="owiclocation" class="d-block py-2"
                  >Owic Created Place</label
                >
                <select
                  class="form-select"
                  id="country"
                  v-model="owiccreatedPlace"
                >
                  <option value="yangon">Yangon</option>
                  <option value="myawadyy">Myawadyy</option>
                </select>
              </div>

              <!-- training Date -->
              <div class="form-group col-6 py-3">
                <label for="trainingStartDate" class="d-block"
                  >Training Start Date</label
                >
                <div class="dateContainer form-control">
                  <input
                    type="text"
                    placeholder="DD"
                    class="datecss"
                    v-model="trainingday"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    placeholder="MM"
                    class="datecss"
                    v-model="trainingmonth"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    placeholder="YYYY"
                    class="datecss"
                    v-model="trainingyear"
                    @input="insertDatetwo"
                  />
                </div>
              </div>

              <!-- depature Date -->
              <div class="form-group col-6 py-3">
                <label for="DepatureDate" class="d-block">Depature Date</label>
                <div class="dateContainer form-control">
                  <input
                    type="text"
                    placeholder="DD"
                    class="datecss"
                    v-model="expireday"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    placeholder="MM"
                    class="datecss"
                    v-model="expiremonth"
                  />
                  <span>/</span>
                  <input
                    type="text"
                    placeholder="YYYY"
                    class="datecss"
                    v-model="expireyear"
                    @input="insertDatethree"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Btn Container -->
        <div
          v-if="employees.data.owic_data && !edit"
          class="d-flex justify-content-center my-2"
        >
          <button class="btn reject mx-2 oneBtn" @click="editData">
            <span>Edit</span>
          </button>
        </div>

        <div
          v-else-if="!employees.data.owic_data"
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
    let owicnum = ref();
    let owiccreateDate = ref();
    let owiccreatedPlace = ref();
    let trainingstartDate = ref();
    let depatureDate = ref();
    let edit = ref(false);
    let errorMessage = ref(null);
    let successModal = ref(false);

    let day = ref();
    let month = ref();
    let year = ref();
    let trainingday = ref();
    let trainingmonth = ref();
    let trainingyear = ref();
    let expireday = ref();
    let expiremonth = ref();
    let expireyear = ref();
    let depatureday = ref();
    let depaturemonth = ref();
    let depatureyear = ref();

    //   date format
    let insertDate = () => {
      owiccreateDate.value = `${day.value}-${month.value}-${year.value}`;
      // console.log(passportcreateDate.value);
    };

    let insertDatetwo = () => {
      trainingstartDate.value = `${trainingday.value}-${trainingmonth.value}-${trainingyear.value}`;
      // console.log(passportexpiredDate.value);
    };

    let insertDatethree = () => {
      depatureDate.value = `${expireday.value}-${expiremonth.value}-${expireyear.value}`;
      // console.log(passportexpiredDate.value);
    };

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
          salary: "3554",
          is_new_employee: 0,
          created_at: null,
          updated_at: null,
        },
        employee_info: {
          user_id: 4,
          name_mm: "ရင်မ",
          name_en: "YIN MAR",
          father_name_mm: "မြင့်စိုး",
          mother_name_en: "DAW AYE WIN",
          mother_name_mm: "အေးဝင်း",
          father_name_en: "U MYINT SOE",
          gender: "female",
          dob: "1994-11-02",
          nrc: "၆\/ပလန(နိုင်)၁၂၄၇၇၉၄၅",
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
          address: "ပုလောမြို့",
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
          passport_cost: "68000261",
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
          passport_number: "MF 83752522",
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
          owic_number: '"YGN 05698832121"',
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

    let handleSubmit = async () => {
      let data = {
        user_id: props.id,
        owic_number: owicnum.value,
        owic_created_date: owiccreateDate.value,
        owic_created_place: owiccreatedPlace.value,
        training_start_date: trainingstartDate.value,
        departure_date: depatureDate.value,
      };

      console.log(data);
    };

    let editData = () => {
      owicnum.value = employees.data.owic_data.owic_number;
      owiccreateDate.value =
        employees.data.owic_data.owic_created_date.split("-");
      day.value = owiccreateDate.value[0];
      month.value = owiccreateDate.value[1];
      year.value = owiccreateDate.value[2];
      owiccreatedPlace.value = employees.data.owic_data.owic_created_place;
      trainingstartDate.value =
        employees.data.owic_data.training_start_date.split("-");
      trainingday.value = trainingstartDate.value[0];
      trainingmonth.value = trainingstartDate.value[1];
      trainingyear.value = trainingstartDate.value[2];
      depatureDate.value = employees.data.owic_data.departure_date.split("-");
      expireday.value = depatureDate.value[0];
      expiremonth.value = depatureDate.value[1];
      expireyear.value = depatureDate.value[2];
      edit.value = true;
    };

    let update = async () => {
      console.log(props.id);
      insertDate();
      insertDatetwo();
      insertDatethree();
      let data = {
        user_id: props.id,
        owic_number: owicnum.value,
        owic_created_date: owiccreateDate.value,
        owic_created_place: owiccreatedPlace.value,
        training_start_date: trainingstartDate.value,
        departure_date: depatureDate.value,
      };
    };

    let cancel = () => {
      edit.value = false;
    };

    let showSuccess = () => {
      successModal.value = true;
    };

    return {
      employees,
      owicnum,
      owiccreateDate,
      owiccreatedPlace,
      trainingstartDate,
      depatureDate,
      handleSubmit,
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
      trainingday,
      trainingmonth,
      trainingyear,
      insertDatethree,
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
