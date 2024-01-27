<template>
  <div class="cvModal bg-light">
    <div class="cv">
      <div class="container">
        <!-- Modal Header -->
        <div class="modalHeader text-center py-3">
          <h3 class="">Worker Contract Details</h3>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('closeModal')"
          >
            <span aria-hidden="true" class="text-dark">&times;</span>
          </button>
        </div>
        <!-- Modal Body -->
        <div v-if="employees" class="modalBody">
          <!-- Personal Information -->
          <div>
            <h5 class="text-primary py-2">Personal Information</h5>
            <div
              class="d-flex justify-content-between align-items-center bolds"
            >
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

              <div
                v-if="!employees.data.passport_and_owic_data == null"
                class=""
              >
                <p>Passport</p>
                <p>
                  {{ employees.data.passport_and_owic_data.passport_number }}
                </p>
              </div>

              <div v-else class="">
                <p>Passport</p>
                <p>No Passport</p>
              </div>
            </div>
          </div>
          <!-- Contract Upload Information -->
          <div>
            <h5 class="text-primary py-2">Contract Upload Information</h5>
            <div
              v-if="employees.data.contrat_upload_data"
              class="contractContainer"
            >
              <div class="row bolds col-8 mx-auto">
                <div class="col-6">
                  <p class="ps-5">Contract Place</p>
                  <p class="ps-5">
                    {{ employees.data.contrat_upload_data.contract_place }}
                  </p>
                </div>

                <div class="col-6">
                  <p class="ps-5">Contract Date</p>
                  <p class="ps-5">
                    {{ employees.data.contrat_upload_data.contract_date }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Btn Container -->
          <!-- <div class="d-flex justify-content-center my-4">
                    <button class="btn reject mx-2 oneBtn"><span class="text-danger" >OK</span></button>
                </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
import LoadingPage from "../components/LoadingPage.vue";
export default {
  props: ["id"],
  components: { LoadingPage },
  setup(props) {
    let store = useStore();
    console.log(props.id);

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

    return {
      employees,
    };
  },
};
</script>

<style>
.oneBtn {
  width: 200px;
}
</style>
