# Sortare tranzacții pe conturi

Proiectul de farță reprezintă o aplicație prin care putem să atribuim anumite tranzacții la un set de conturi.

Puțin context:

Folosesc aplicația hledger pentru finanțe personale și afacere.
Aplicația functionează pe baza înregistrării tranzacțiilor într-un jurnal.

Folosesc ING Homebank ca bancă. ING permite exportarea tranzacțiilor într-un CSV urât.
Am scris un convertor din formatul CSV în JSON care poate fi procesat de unelte.

Acum am nevoie să pot atribui fiecare tranzacție din exportul ING la un cont din hledger.

Lista de conturi este definită de mine.

Bonus: Aplicăția să mai permită atribuirea unei tranzacții la un cont nou - al cărui nume sa fie introdus de utilizator.

## Sugestie de implementare

Se scrie aplicația în React. Aplicația va folosi date statice.
Datele pot fi date fie prin js import, fie lipte într-un text area.

### Datele de intrare

- lista de conturi
- lista de tranzacții

### Date de ieșire

- list de tranzacții atașate contului

### Functionalități

- Aplicația va dispune de un textarea unde se vor introduce numele conturilor sub formă de listă (documentație)
 - prin apasarea unui buton, sub textarea se va popula/updata o coloană cu lista de conturi;
 
- Aplicația va randa listele de tranzacții și conturi una lângă alta
  - listele sunt derulabile - numărul de conturi și de tranzacții sunt măricele: conturi 50-100, tranzacții 1000
  - să încapă pe ecran cât mai multe
- Aplicația va permite utilizatorului să tragă o tranzacție într-un cont existent și va face asocierea
  - asocierea unei tranzacții cu un cont o face să dispară din listă / să fie indisponibilă pentru selecție ulterioară
- Utilizatorul va putea exporta asocierile de cont + tranzacție într-un json pe care să îl salveze (text area de unde poate fi copiat sau altfel ?!)
- Bonus: Aplicația va permite utilizatorului să creeze un cont nou și să tragă o tranzacție peste el

### Codul proiectului

Va fi urcat la `https://github.com/netdava/transaction-selector`

### Exemple date

Lista de conturi (exemplu) `hledger accounts -f current.hledger`

```ledger
Assets
Assets:Portofel
Assets:Economii
Assets:Creanțe
Assets:Revolut
Assets:INGB
Assets:INGB:Cont curent
Assets:INGB:Economii
Liabilities
Equity
Equity:Opening balances
Revenues
Revenues:Dobânzi bancare
Revenues:Retur
Expenses
Expenses:Casă:Cheltuieli curente
Expenses:Casă:Chirie
Expenses:Casă:Energie electrică
Expenses:Casă:Utilități:Internet
Expenses:Casă:Întreținere
Expenses:INGB:Taxe și comisioane
Expenses:Mâncare:Băcănie
Expenses:Mâncare:Piață
Expenses:Mâncare:Restaurant
Expenses:Personale:Cadouri
Expenses:Personale:Vacanță
Expenses:Sănătate:Medicamente
Expenses:Taxe:CAS
Expenses:Taxe:CASS
Expenses:Transport:Taxi
```

Exemplu listă de tranzacții (cu câompurile originaldata si details golite - irelevante):

```json
[
    {
        "title": "Taxe si comisioane",
        "txNumber": 1,
        "originalData": [
        ],
        "details": [
        ],
        "date": "2017-12-28",
        "parsedDetails": {
            "Comision administrare cont": " 7"
        },
        "balance": "2430.13",
        "credit": "0",
        "debit": "7"
    },
    {
        "title": "Cumparare POS",
        "txNumber": 2,
        "originalData": [
        ],
        "details": [
        ],
        "date": "2017-12-27",
        "parsedDetails": {
            "Nr. card": " xxxx xxxx xxxx 9513",
            "Data": " 22-12-2017 Autorizare: 002708",
            "Terminal": " THERME NORD DEP  RO  Balotesti"
        },
        "balance": "2437.13",
        "credit": "0",
        "debit": "60"
    },
    {
        "title": "Cumparare POS",
        "txNumber": 3,
        "originalData": [
        ],
        "details": [
        ],
        "date": "2017-12-27",
        "parsedDetails": {
            "Nr. card": " xxxx xxxx xxxx 9513",
            "Data": " 22-12-2017 Autorizare: 124745",
            "Terminal": " IKEA ROMANIA SRL  RO  BUCURESTI"
        },
        "balance": "2497.13",
        "credit": "0",
        "debit": "269.6"
    },
    {
        "title": "Cumparare POS",
        "txNumber": 4,
        "originalData": [ ],
        "details": [
        ],
        "date": "2017-12-27",
        "parsedDetails": {
            "Nr. card": " xxxx xxxx xxxx 9513",
            "Data": " 22-12-2017 Autorizare: 718456",
            "Terminal": " IKEA ROMANIA SRL  RO  BUCURESTI"
        },
        "balance": "2766.73",
        "credit": "0",
        "debit": "18.5"
    },
    {
        "title": "Cumparare POS",
        "txNumber": 5,
        "originalData": [ ],
        "details": [
        ],
        "date": "2017-12-27",
        "parsedDetails": {
            "Nr. card": " xxxx xxxx xxxx 9513",
            "Data": " 21-12-2017 Autorizare: 044431",
            "Terminal": " AUCHAN 31 COTROCENI  RO  BUCURESTI"
        },
        "balance": "2785.23",
        "credit": "0",
        "debit": "39.71"
    }
]
```
