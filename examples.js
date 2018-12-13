'use strict';

var clientinfo_example = [{
    "basic": {
      "customer_documentType": "CC",
      "customer_documentId": "1053847608",
      "customer_password": "12345",
      "customer_name": "Julio Andres",
      "customer_surname": "Jaramillo",
      "customer_secondSurname": "Carrillo",
      "customer_type": "Persona Natural",
      "customer_state": "Activo",
      "customer_vinculationState": "Habilitado",
      "customer_vinculationDate": "2018-09-26",
      "customer_stateUpdateDate": "2018-10-21",
      "customer_vinculationOffice": "02",
      "customer_businessName": "Julio Carrillo",
      "customer_bornDate": "1995-05-03"
    },
    "detail": {
      "customer_internalRisk": "Alto",
      "customer_indicatorACE": "10",
      "customer_economicActivity": "Programador",
      "customer_pep": true,
      "customer_academicLevel": "Doctorado",
      "customer_company": "Global Solution S.A.S",
      "customer_emailJob": "jjaramillo@gsg.com",
      "legalRepresentative_name": "Ricardo Gareca",
      "legalRepresentative_phone": "3217667657"
    },
    "financialData": {
      "tax_declarant": true,
      "income_month": 1000000,
      "income_monthOther": 200000,
      "income_monthTotal": 1200000,
      "egress_monthTotal": 300000,
      "assets_total": 9000000,
      "liabilities_total": 4000000,
      "patrimony": 20000000,
      "revenue_totalDate": "2018-11-21",
      "revenue_real": 180000000,
      "retainer": true,
      "self-retainer": true,
      "taxplayer_class": "especial",
      "taxpayer_type": "Persona Natural",
      "currency_code": "COP",
      "iva_regime": "",
      "cost_total": 900000
    },
    "ubication": {
      "customer_address": "Carrera 10 #46b-50",
      "customer_cityCode": "20",
      "customer_departmentCode": "10",
      "customer_countryCode": "CO",
      "customer_phone": "4450987",
      "customer_cellphone": "3108976543",
      "customer_email": "jandres@example.com"
    },
    "id": "1"
  }, {
    "basic": {
      "customer_documentType": "CC",
      "customer_documentId": "1053847608",
      "customer_password": "12345",
      "customer_name": "Julio Andres",
      "customer_surname": "Jaramillo",
      "customer_secondSurname": "Carrillo",
      "customer_type": "Persona Natural",
      "customer_state": "Activo",
      "customer_vinculationState": "Habilitado",
      "customer_vinculationDate": "2018-09-26",
      "customer_stateUpdateDate": "2018-10-21",
      "customer_vinculationOffice": "02",
      "customer_businessName": "Julio Carrillo",
      "customer_bornDate": "1995-05-03"
    },
    "detail": {
      "customer_internalRisk": "Alto",
      "customer_indicatorACE": "10",
      "customer_economicActivity": "Programador",
      "customer_pep": true,
      "customer_academicLevel": "Doctorado",
      "customer_company": "Global Solution S.A.S",
      "customer_emailJob": "jjaramillo@gsg.com",
      "legalRepresentative_name": "Ricardo Gareca",
      "legalRepresentative_phone": "3217667657"
    },
    "financialData": {
      "tax_declarant": true,
      "income_month": 1000000,
      "income_monthOther": 200000,
      "income_monthTotal": 1200000,
      "egress_monthTotal": 300000,
      "assets_total": 9000000,
      "liabilities_total": 4000000,
      "patrimony": 20000000,
      "revenue_totalDate": "2018-11-21",
      "revenue_real": 180000000,
      "retainer": true,
      "self-retainer": true,
      "taxplayer_class": "especial",
      "taxpayer_type": "Persona Natural",
      "currency_code": "COP",
      "iva_regime": "",
      "cost_total": 900000
    },
    "ubication": {
      "customer_address": "Carrera 10 #46b-50",
      "customer_cityCode": "20",
      "customer_departmentCode": "10",
      "customer_countryCode": "CO",
      "customer_phone": "4450987",
      "customer_cellphone": "3108976543",
      "customer_email": "jandres@example.com"
    },
    "id": "2"
  }];

var accounts = [
  {id: 100, funds: 5000, debt: 3000, type: "debtor", score: "alto", rate: 12, max_rate: 9, min_rate: 6, periods: 8, still: 3, assessment: 225},
  {id: 101, funds: 2000, debt: 5000, type: "debtor", score: "bajo", rate: 11, max_rate: 8, min_rate: 5, periods: 8, still: 3, assessment: 225},
  {id: 102, funds: 8000, debt: 8000, type: "debtor", score: "medio", rate: 15, max_rate: 12, min_rate: 9, periods: 8, still: 3, assessment: 225},
  {id: 103, funds: 2000, debt: 3000, type: "debtor", score: "alto", rate: 13, max_rate: 10, min_rate: 7, periods: 8, still: 3, assessment: 225},
  {id: 104, funds: 5000, debt: 5000, type: "debtor", score: "medio", rate: 10, max_rate: 7, min_rate: 4, periods: 8, still: 3, assessment: 225},
  {id: 105, funds: 5000, debt: 0, type: "investor", debt_value: 2000, cut_rate: 0.7, cuote_value: 200},
  {id: 106, funds: 6000, debt: 8000, type: "debtor", score: "bajo", rate: 12, max_rate: 9, min_rate: 6, periods: 8, still: 3, assessment: 225},
  {id: 107, funds: 11000, debt: 0, type: "investor", debt_value: 2000, cut_rate: 0.7, cuote_value: 200}
  ];

var auctions = [
  {debtor: accounts[0], participants: [], status: "open"},
  {debtor: accounts[1], participants: [], status: "open"},
  {debtor: accounts[2], participants: [], status: "open"},
  {debtor: accounts[3], participants: [], status: "open"},
  {debtor: accounts[4], participants: [], status: "open"},
  {debtor: accounts[6], participants: [], status: "open"}
];

var actual = accounts[5];

module.exports = {
 	 getClient : clientinfo_example,
   getAccounts: accounts,
   getActualAccount: actual,
   getAuctions: auctions
};