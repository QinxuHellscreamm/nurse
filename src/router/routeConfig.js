
import router from "./router";
import Login from'@/pages/login/login'
import infoshare from'@/pages/infoshare/infoshare'
/*护士工作站*/
import Workstation from '@workstation/workstation'
import inPatients from '@workstation/inPatients/inPatients'
import OutPatients from "@workstation/outPatients/outPatients"
import AccPatients from "@workstation/acc/accPatients"
import BatchEntryOfSigns from '@workstation/batchEntryOfSigns/batchEntryOfSigns'
import BloodSugarEntry from '@workstation/bloodSugarEntry'
import PatientDOC from '@workstation/PatientDOC/PatientDocPage'
import GrantpatientDOC from '@workstation/grantpatientDOC/grantpatientDOC'
import BabyDOC from '@workstation/babyDOC/babyDocPage'
import BatchBedSetUp from '@workstation/batchBedSetUp/batchBedSetUp'
import DoctorPro from '@workstation/doctorPro/doctorPro'
import DoctorImp from '@workstation/doctorImp/doctorImp'
import ShiftReport from '@workstation/shiftReport/shiftReport'
import AdverseEventRep from '@workstation/adverseEventRep/adverseEventRep'
import DocSugarEntry from '@workstation/docSugarEntry/docSugarEntry'

import ManagePlatform from '@managePlatform/managePlatform'
/*护理管理 start*/
import Nurse from '@nurse/nurse'
//import NurseScheduling from '@nurse/nurseScheduling/nurseScheduling'
import OutArchives from '@nurse/outArchives/outArchives'
import PeopleList from '@nurse/outArchives/peopleList'
import AllRecord from '@nurse/outArchives/allRecord'

import StrucAnalysis from '@nurse/strucAnalysis'
import TurRate from '@nurse/turRate'
/*护理管理 end*/

/* 文书质控 */
import manageDocument from '@managePlatform/manageDocument/manageDocument'
import managePatientlist from '@managePlatform/manageDocument/managePatientlist/managePatientlist'
/*不良事件 */
import adverseEvent from '@adverseEvent/adverseEvent'
/*不良事件管理*/
import Manage from '@manage/manage'
import EventList from '@manage/eventList'
import Report from '@manage/report'
import ViewReport from '@manage/viewReport'
/*不良事件统计 */
import Count from '@count/count'
/*不良事件统计 end*/
import EventStaA from '@count/eventStaA'
import EventStaB from '@count/eventStaB'
import EventStaC from '@count/eventStaC'
import EventStaD from '@count/eventStaD'
import EventStaE from '@count/eventStaE'
import EventStaF from '@count/eventStaF'
import EventStaG from '@count/eventStaG'
import EventStaH from '@count/eventStaH'
/*不良事件end*/
/*实时统计*/
import RealTime from '@managePlatform/realTime/realTime'
//import Incident from '@managePlatform/realTime/incident'
import Orders from '@managePlatform/realTime/orders'
import InpatientArea from '@managePlatform/realTime/inpatientArea'
/*智能排班*/
import Scheduling from '@managePlatform/scheduling/scheduling'
/*床位使用情况*/
import BedSituation from '@managePlatform/bedSituation/bedSituation'
import Analysis from '@managePlatform/bedSituation/analysis/analysis'
import Contrast from '@managePlatform/bedSituation/contrast/contrast'
import Situation from '@managePlatform/bedSituation/situation'
/*敏感指标*/
import Sensitive from '@managePlatform/sensitive/sensitive'
import SensitiveA from '@managePlatform/sensitive/sensitiveA'
import SensitiveB from '@managePlatform/sensitive/sensitiveB'
import SensitiveC from '@managePlatform/sensitive/sensitiveC'
import SensitiveD from '@managePlatform/sensitive/sensitiveD'
import SensitiveE from '@managePlatform/sensitive/sensitiveE'
import SensitiveF from '@managePlatform/sensitive/sensitiveF'
import SensitiveG from '@managePlatform/sensitive/sensitiveG'
/*ICU*/
import Icusensitive from '@managePlatform/ICUsensitive/ICUsensitive'
import IcusensiA from '@managePlatform/ICUsensitive/ICUsensiA'
import IcusensiB from '@managePlatform/ICUsensitive/ICUsensiB'
import IcusensiC from '@managePlatform/ICUsensitive/ICUsensiC'
/*护士绩效考核*/
import Assessment from '@managePlatform/assessment/assessment'
/*护理满意度*/
import Satisfied from '@managePlatform/satisfied/satisfied'
import SatisA from '@managePlatform/satisfied/satisA'
import SatisB from '@managePlatform/satisfied/satisB'
import SatisC from '@managePlatform/satisfied/satisC'
/*全息*/
import HologView from '@managePlatform/hologView/hologView'





/*平台管理系统*/
import nursingPlatform from '@/pages/nursingPlatform/nursingPlatform'
/*system start*/
import System from '@system/system'
import Users from '@system/users/users'
import Roles from '@system/roles/roles'
import Auths from '@system/auths/auths'
import Log from '@system/log/log'
import LogManage from '@system/log/logManage'
import LogMobilenurse from '@system/log/logMobilenurse'
import Authsresources from '@system/authsresources/authsresources' //权限资源
import Frontroutes from '@system/frontroutes/frontroutes'  //前端路由
import Frontresources from '@system/frontresources/frontresources'  //前端资源
import Backauths from '@system/backauths/backauths'  //后端权限
/*system end*/

/*知识库 start*/
import knowledgeBase from '@knowledge/knowledgeBase'
/*健康宣教库 start*/
import HealthBank from '@knowledge/healthBank/HealthBank'
/*健康宣教库 end*/
/*护理措施库 start*/
import NursingBank from '@knowledge/NursingBank'
import NursingCS from '@knowledge/NursingBank/NursingCS/NursingCS'
import SignRelation from '@knowledge/NursingBank/signRelation/signRelation'
import RiskRelation from '@knowledge/NursingBank/riskRelation/riskRelation'
/*护理措施库 end*/
/*护理路径库 start*/
import NursingPlanBank from '@knowledge/NursingPlanBank'
/*护理路径库 end*/
/*知识库 end*/

/*documentAdmin*/
import DocumentAdmin from '@document/documentAdmin'
/*docTemplateAdmin start*/
import DocTemplateAdmin from '@docTemplateAdmin/docTemplateAdmin'
import AssessTPL from '@docTemplateAdmin/assessTPL'
import RecordTPL from '@docTemplateAdmin/recordTPL'
import HandoverTPL from '@docTemplateAdmin/handoverTPL'
import InformTPL from '@docTemplateAdmin/informTPL'
import OpsTPL from '@docTemplateAdmin/opsTPL'
import AddTemplate from '@docTemplateAdmin/addTemplate'
import EditTemplate from '@docTemplateAdmin/editTemplate'
/*docTemplateAdmin end*/
/*文书题目管理 start*/
import DocSubjectAdmin from '@docSubjectAdmin/docSubjectAdmin'
import AssessSub from '@docSubjectAdmin/assessSub'
import RecordSub from '@docSubjectAdmin/recordSub'
import HandoverSub from '@docSubjectAdmin/handoverSub'
import InformSub from '@docSubjectAdmin/informSub'
/*文书题目管理 end*/
import TemperatureChartAdmin from '@document/temperatureChartAdmin/temperatureChartAdmin'
/*documentAdmin*/

/*dictionary start*/
import Dictionary from '@dictionary/dictionary'
import Partdic from '@dictionary/partDic/partdic'
import Warddic from '@dictionary/wardDic/warddic'
/*dictionary->医嘱字典*/
import Advicedic from '@dictionary/adviceDic/advicedic'
import Advicecat from "@dictionary/adviceDic/adviceCat"
import Useway from "@dictionary/adviceDic/useway"
import Wayass from "@dictionary/adviceDic/wayass"
/*dictionary->医嘱字典*/
import Vitaldic from '@dictionary/vitalDic/vitaldic'
/*dictionary->人员字典 start*/
import Workersdic from '@dictionary/workersDic/workersdic'
import Doctordic from '@dictionary/workersDic/doctordic'
import Nursedic from '@dictionary/workersDic/nursedic'
/*dictionary->人员字典 end*/
/*dictionary->疾病字典*/
import Diseasedic from '@dictionary/diseaseDic/diseasedic'
/*dictionary->病人信息字典*/
import Patientinfodic from '@dictionary/patientinfoDic/patientinfodic'
/*dictionary end*/

/*移动护士站*/
import MobileNurse from '@mobileNurse/mobileNurse'
/*移动护士站->住院模块*/
import InHospital from '@inhospital/inHospital'
import HealthEdu from '@inhospital/healthEdu/healthEdu'
import RiskRatin from '@inhospital/riskRatin/riskRatin'
import VitalSign from '@inhospital/vitalSign/vitalSign'
import MedicalOrder from '@inhospital/medical/medicalOrder'
/*移动护士站->住院模块*/
import Version from '@mobileNurse/version/version'




var getRouter = sessionStorage.routes ? JSON.parse(sessionStorage.routes) : null

router.beforeEach((to, from, next) => {

  if(getRouter){
      let vueRoute = getRouter
      console.log(vueRoute)
      if(vueRoute.component=="ManagePlatform"){
        vueRoute.component = ManagePlatform

        vueRoute.children.forEach(item=>{
          switch (item.component) {
            case 'manageDocument':
                item.component = manageDocument
                item.children.forEach(itemtwo=>{
                    switch (itemtwo.component) {
                        case 'managePatientlist':
                            itemtwo.component = managePatientlist
                            break
                    }
                })
                break
            case 'Nurse':
              item.component = Nurse
              item.children.forEach(itemtwo=>{
                switch (itemtwo.component) {
                  case 'OutArchives':
                    itemtwo.component = OutArchives
                    itemtwo.children.forEach(itemthr=>{
                      switch (itemthr.component) {
                        case 'PeopleList':
                          itemthr.component = PeopleList
                          break
                        case 'AllRecord':
                          itemthr.component = AllRecord
                          break
                      }
                    })
                    break
                  case 'StrucAnalysis':
                    itemtwo.component = StrucAnalysis
                    break
                  case 'TurRate':
                    itemtwo.component = TurRate
                    break
                }
              })
              break
            case 'DocumentAdmin':
                  item.component = DocumentAdmin
                  item.children.forEach(itemtwo=>{
                      switch (itemtwo.component) {
                          case 'DocTemplateAdmin':
                              itemtwo.component = DocTemplateAdmin
                              itemtwo.children.forEach(itemthr=>{
                                  switch (itemthr.component) {
                                      case 'AssessTPL':
                                          itemthr.component = AssessTPL
                                          break
                                      case 'RecordTPL':
                                          itemthr.component = RecordTPL
                                          break
                                      case 'HandoverTPL':
                                          itemthr.component = HandoverTPL
                                          break
                                      case 'InformTPL':
                                          itemthr.component = InformTPL
                                          break
                                      case 'OpsTPL':
                                          itemthr.component = OpsTPL
                                          break
                                      case 'EditTemplate':
                                          itemthr.component = EditTemplate
                                          break
                                      case 'AddTemplate':
                                          itemthr.component = AddTemplate
                                          break
                                  }
                              })
                              break
                          case 'DocSubjectAdmin':
                              itemtwo.component = DocSubjectAdmin
                              itemtwo.children.forEach(itemthr=>{
                                  switch (itemthr.component) {
                                      case 'AssessSub':
                                          itemthr.component = AssessSub
                                          break
                                      case 'RecordSub':
                                          itemthr.component = RecordSub
                                          break
                                      case 'HandoverSub':
                                          itemthr.component = HandoverSub
                                          break
                                      case 'InformSub':
                                          itemthr.component = InformSub
                                          break
                                  }
                              })
                              break
                          case 'TemperatureChartAdmin':
                              itemtwo.component = TemperatureChartAdmin
                              break
                      }
                  })
                  break
              case 'adverseEvent':
              item.component = adverseEvent
              item.children.forEach(itemtwo=>{
                switch (itemtwo.component) {
                  case 'Manage':
                    itemtwo.component = Manage
                    itemtwo.children.forEach(itemthr=>{
                      switch (itemthr.component) {
                        case 'EventList':
                          itemthr.component = EventList
                          break
                        case 'Report':
                          itemthr.component = Report
                          break
                        case 'ViewReport':
                            itemthr.component = ViewReport
                            break
                      }
                    })
                    break
                  case 'Count':
                    itemtwo.component = Count
                    itemtwo.children.forEach(itemthr=>{
                      switch (itemthr.component) {
                        case 'EventStaA':
                          itemthr.component = EventStaA
                          break
                        case 'EventStaB':
                          itemthr.component = EventStaB
                          break
                        case 'EventStaC':
                          itemthr.component = EventStaC
                          break
                        case 'EventStaD':
                          itemthr.component = EventStaD
                          break
                        case 'EventStaE':
                          itemthr.component = EventStaE
                          break
                        case 'EventStaF':
                          itemthr.component = EventStaF
                          break
                        case 'EventStaG':
                          itemthr.component = EventStaG
                          break
                        case 'EventStaH':
                          itemthr.component = EventStaH
                          break
                      }
                    })
                    break
                }
              })
              break
            case 'RealTime':
              item.component = RealTime
              item.children.forEach(itemtwo=>{
                switch (itemtwo.component) {
                  case 'Orders':
                    itemtwo.component = Orders
                    break
                  case 'InpatientArea':
                    itemtwo.component = InpatientArea
                    break
                }
              })
              break
            case 'BedSituation':
              item.component = BedSituation
              item.children.forEach(itemtwo=>{
                switch (itemtwo.component) {
                  case 'Analysis':
                    itemtwo.component = Analysis
                    break
                  case 'Contrast':
                    itemtwo.component = Contrast
                    break
                  case 'Situation':
                    itemtwo.component = Situation
                    break
                }
              })
              break
            case 'Scheduling':
              item.component = Scheduling
              break
            case 'Sensitive':
              item.component = Sensitive

              item.children.forEach(itemtwo=>{
                switch (itemtwo.component) {
                  case 'SensitiveA':
                    itemtwo.component = SensitiveA
                    break
                  case 'SensitiveB':
                    itemtwo.component = SensitiveB
                    break
                  case 'SensitiveC':
                    itemtwo.component = SensitiveC
                    break
                  case 'SensitiveD':
                    itemtwo.component = SensitiveC
                    break
                  case 'SensitiveE':
                    itemtwo.component = SensitiveC
                    break
                  case 'SensitiveF':
                    itemtwo.component = SensitiveC
                    break
                  case 'SensitiveG':
                    itemtwo.component = SensitiveC
                    break
                }
              })
              break
            case 'Icusensitive':
              item.component = Icusensitive
              item.children.forEach(itemtwo=>{
                switch (itemtwo.component) {
                  case 'IcusensiA':
                    itemtwo.component = IcusensiA
                    break
                  case 'IcusensiB':
                    itemtwo.component = IcusensiB
                    break
                  case 'IcusensiC':
                    itemtwo.component = IcusensiC
                    break
                }
              })
              break
            case 'Assessment':
              item.component = Assessment
              break
            case 'Satisfied':
              item.component = Satisfied
              item.children.forEach(itemtwo=>{
                switch (itemtwo.component) {
                  case 'SatisA':
                    itemtwo.component = SatisA
                    break
                  case 'SatisB':
                    itemtwo.component = SatisB
                    break
                  case 'SatisC':
                    itemtwo.component = SatisC
                    break
                }
              })
              break
            case 'HologView':
              item.component = HologView
              break

          }
        })

        router.addRoutes([{path:"/",name:'login',component:Login}, {path:"/login",name:'login',component:Login}, vueRoute])
        routerGo(to,next)

    }

      if(vueRoute.component=="Workstation"){
        vueRoute.component = Workstation

        vueRoute.children.forEach(item=>{
          switch (item.component) {
            case 'inPatients':
              item.component = inPatients
              break
            case 'OutPatients':
              item.component = OutPatients
              break
            case 'AccPatients':
              item.component = AccPatients
              break
            case 'PatientDOC':
              item.component = PatientDOC
              break
            case 'GrantpatientDOC':
              item.component = GrantpatientDOC
              break
            case 'BabyDOC':
              item.component = BabyDOC
              break
            case 'BatchEntryOfSigns':
              item.component = BatchEntryOfSigns
              break
            case 'BloodSugarEntry':
              item.component = BloodSugarEntry
              break
            case 'DocSugarEntry':
              item.component = DocSugarEntry
              break
            case 'BatchBedSetUp':
              item.component = BatchBedSetUp
              break
            case 'DoctorPro':
              item.component = DoctorPro
              break
            case 'ShiftReport':
              item.component = ShiftReport
              break
            case 'AdverseEventRep':
              item.component = AdverseEventRep
              break
            case 'DoctorImp':
              item.component = DoctorImp
              break
          }
        })
        router.addRoutes([vueRoute])
        routerGo(to,next)
      }

      if(vueRoute.component == 'nursingPlatform'){
        let vueRoute2 = {
          path:'/nursingPlatform',
          name:'index',
          component:nursingPlatform,
          requireAuth: true ,
          children: [
            {
              path: '/nursingPlatform/knowledgeBase',
              name: 'knowledgeBase',
              component: knowledgeBase,
              children:[
                {
                  path: '/nursingPlatform/knowledgeBase/HealthBank',
                  name: 'healthBank',
                  component: HealthBank
                },
                {
                  path: '/nursingPlatform/knowledgeBase/NursingBank',
                  name: 'nursingBank',
                  component: NursingBank,
                  children:[
                    {
                      path: '/nursingPlatform/knowledgeBase/NursingBank/NursingCS',
                      name: 'nursingCS',
                      component: NursingCS
                    },
                    {
                      path: '/nursingPlatform/knowledgeBase/NursingBank/signRelation',
                      name: 'signRelation',
                      component: SignRelation
                    },
                    {
                      path: '/nursingPlatform/knowledgeBase/NursingBank/riskRelation',
                      name: 'riskRelation',
                      component: RiskRelation
                    }
                  ],redirect: '/nursingPlatform/knowledgeBase/NursingBank/NursingCS'
                },
                {
                  path: '/nursingPlatform/knowledgeBase/NursingPlanBank',
                  name: 'NursingPlanBank',
                  component: NursingPlanBank
                },
              ],redirect:'/nursingPlatform/knowledgeBase/HealthBank'
            },

            {
              path: '/nursingPlatform/dictionary',
              name: 'dictionary',
              component: Dictionary,
              children: [
                {
                  path : '/nursingPlatform/dictionary/partdic',
                  name : 'Partdic',
                  component : Partdic
                },
                {
                  path : '/nursingPlatform/dictionary/warddic',
                  name : 'Warddic',
                  component : Warddic
                },
                {
                  path : '/nursingPlatform/dictionary/advicedic',
                  name : 'Advicedic',
                  component : Advicedic,
                  children:[
                    {
                      path : '/nursingPlatform/dictionary/advicedic/advicecat',
                      name : 'Advicecat',
                      component : Advicecat
                    },
                    {
                      path : '/nursingPlatform/dictionary/advicedic/useway',
                      name : 'Useway',
                      component : Useway
                    },
                    {
                      path : '/nursingPlatform/dictionary/advicedic/wayass',
                      name : 'Wayass',
                      component : Wayass
                    }
                  ],redirect:'/nursingPlatform/dictionary/advicedic/advicecat'
                },
                {
                  path : '/nursingPlatform/dictionary/vitaldic',
                  name : 'Vitaldic',
                  component : Vitaldic
                },
                {
                  path : '/nursingPlatform/dictionary/patientinfodic',
                  name : 'patientinfodic',
                  component : Patientinfodic
                },
                {
                  path : '/nursingPlatform/dictionary/workersdic',
                  name : 'Workersdic',
                  component : Workersdic,
                  children : [
                    {
                      path : '/nursingPlatform/dictionary/workersdic/doctordic',
                      name : 'doctordic',
                      component : Doctordic
                    },
                    {
                      path : '/nursingPlatform/dictionary/workersdic/nursedic',
                      name : 'nursedic',
                      component : Nursedic
                    }
                  ],redirect:'/nursingPlatform/dictionary/workersdic/doctordic'
                },
                {
                  path : '/nursingPlatform/dictionary/diseasedic',
                  name : 'Diseasedic',
                  component : Diseasedic
                },
              ],redirect:'/nursingPlatform/dictionary/partdic'
            },
            {
              path: '/nursingPlatform/system',
              name: 'system',
              component: System,
              children: [
                {
                  path : '/nursingPlatform/system/users',
                  name : 'users',
                  component : Users
                },
                {
                  path : '/nursingPlatform/system/roles',
                  name : 'roles',
                  component : Roles
                },
                {
                  path : '/nursingPlatform/system/auths',
                  name : 'auths',
                  component : Auths
                },
                {
                    path : '/nursingPlatform/system/authsresources',
                    name : 'authsresources',
                    component : Authsresources
                },
                {
                    path : '/nursingPlatform/system/backauths',
                    name : 'backauths',
                    component : Backauths
                },
                {
                    path : '/nursingPlatform/system/frontroutes',
                    name : 'frontroutes',
                    component : Frontroutes
                },
                {
                    path : '/nursingPlatform/system/frontresources',
                    name : 'frontresources',
                    component : Frontresources
                },
                {
                  path : '/nursingPlatform/system/log',
                  name : 'logma',
                  component : Log,
                  children : [
                    { path : '/nursingPlatform/system/log/logma',
                      name : 'log',
                      component : LogManage
                    },
                    { path : '/nursingPlatform/system/log/logmo',
                      name : 'logmo',
                      component : LogMobilenurse
                    },
                  ],redirect:'/nursingPlatform/system/log/logma'
                }

              ],redirect:'/nursingPlatform/system/users'
            },
            {
              path: '/nursingPlatform/mobileNurse',
              name: 'mobileNurse',
              component: MobileNurse,
              children:[
                {
                  path : '/nursingPlatform/mobileNurse/inHospital',
                  name : 'InHospital',
                  component : InHospital,
                  children : [
                    {
                      path : '/nursingPlatform/mobileNurse/inHospital/healthEdu',
                      name : 'HealthEdu',
                      component : HealthEdu
                    },
                    {
                      path : '/nursingPlatform/mobileNurse/inHospital/riskRatin',
                      name : 'RiskRatin',
                      component : RiskRatin
                    },
                    {
                      path : '/nursingPlatform/mobileNurse/inHospital/vitalSign',
                      name : 'VitalSign',
                      component : VitalSign
                    },
                    {
                      path : '/nursingPlatform/mobileNurse/inHospital/medicalOrder',
                      name : 'MedicalOrder',
                      component : MedicalOrder
                    }
                  ],redirect:'/nursingPlatform/mobileNurse/inHospital/healthEdu'
                },
                {
                  path : '/nursingPlatform/mobileNurse/version',
                  name : 'version',
                  component : Version
                }
              ],redirect:'/nursingPlatform/mobileNurse/inHospital'
            }
          ],redirect:'/nursingPlatform/knowledgeBase/HealthBank'
        }
        router.addRoutes([{path:"/",name:'login',component:Login},{path:"/login",component:Login},vueRoute2])
        routerGo(to,next)
      }

  }else{
    if (to.matched.length ===0) { //如果未匹配到路由
      from.name ? next({ name:from.name }) : next('/')
    }else{
      next()
    }
  }
})
function routerGo(to, next) {
  console.log(to)
  getRouter = null
  next({ ...to, replace: true })
}
