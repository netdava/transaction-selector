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


#### Sugestii UI/UX

- Filtru pentru vizibilitate conturi
- Selector cont sursa pentru tranzacții
- Să fie afișate tranzacțiile în ambele conturi - ca sursă și ca destinație
- Buton de ștergere atribuire tranzacție la cont
- Buton de schimb cont sursă cu cont destinație la o tranzacție atribuită
- Buton de selectare fișier CSV/Excell pentru tranzacții

### Functionalități

Aplicația va afișa

- O coloană cu conturi
- O coloană cu tranzacții atribuite
- O coloană cu tranzacții ne-atribuite

#### Inițializarea conturilor

Conturile sunt alcătuite din cuvinte separate prin ":". Se inițializează prin intermediul unui elemente Text Area.
Odată lista de conturi introdusă (copy paste / adăugare manuală) se face o sincronizare și se actualizează lista de conturi disponibile pentru tranzacții.

Reguli de actualizare

- Conturile care sunt noi se adaugă la listă în poziția unde sunt
- Conturile care nu mai sunt în listă (au fost scoase) se scot și tranzacțiile atribuite lor sunt disponibile pentru atribuire
- Conturile existente nu se întâmplă nimic cu ele. Li se schimbă eventual ordinea din lista.

#### Inițializarea tranzacțiilor

Tranzacțiile sunt inițializate dintr-un fișier CSV/Excel. Putem folosi un elmenet HTML file upload care va permite alegerea unui fișier de pe disc.
Acest fișier va putea fi citit și interpretat. Din el se va popula *ista de tranzacții disponibile pentru atribuire*.

#### Structura de bază a aplicației

Aplicația va afișa infromațiile grafic astfel:

- Text area pentru introducerea de conturi
- Selector HTML pentru fișiere pentru introducerea de tranzacții
- Trei coloane pentru funcționalitatea de bază:
  - una pentru conturi
  - una pentru tranzacții atribuite
  - una pentru tranzacții de atribuit
- Buton de export date

Elementele din coloane sunt filtrabile Atât pentru conturi cât si pentru tranzacții. Filtrele sunt filtre simple text.
De obicei se vor înregistra cheltuieli (Expenses) și e bine să filtrăm doar după conturile de Expenses.
Pe cealaltă parte tranzacțiile sunt adesea recurente - la același magazin. Deci e bine să putem filtra după atributele din tranzacție.
Ex: Vreau să pot filtra după tranzacțiile de "Taxe și comisioane".

Tranzacții sunt - numărul de conturi și de tranzacții sunt măricele: conturi 50-100, tranzacții 1000. Listele trebuie să fie derulabile.
Dimensiunea verticală a colonelor este bine să fie fixă și limitată la un număr de tranzacții care să nu necesite derlarea ecranului.

#### Asocierea unei tranzacții la un cont

Pași precursori:

- conturi selectate
- tranzacții importate
- cont sursă selectat

Fiecare tranzacție face parte din două conturi: contul sursă - din care pleacă banii, și contul destinație - în care se duc banii.
Teoretic o tranzacție poate conține mai mult de două conturi, dar nu suportăm tranzacție cu mai mult de 2 conturi - nu face sens.

Tranzacțiile mai pot fi de asemnea categorisite după acțiunea asupra contului:

- cele care scad balanța: câmpul debit > 0
- cele care cresc balanța: câmpul credit > 0

Tranzacțiile pot fi iltrate sau evidențiate (colorate diferit) după acest criteriu.

#### Asocierea la un cont

Aplicația va permite utilizatorului să tragă o tranzacție peste un un cont și va face asocierea.
Tranzacția va fi "vizibilă" în lista de tranzacții atât pentru contul sursă cât și pentru destinație.
Aplicația va permite schimbarea contului sursă cu cel destinație pentru o tranzacție.

Asocierea unei tranzacții cu un cont o face să dispară din listă / să fie indisponibilă pentru selecție ulterioară.
Ștergerea asocierii va face ca tranzacția să fie din nou disponibilă pentru asociere.

#### Tranzacțiile asociate unui cont

Selecția unui cont din lista de conturi va afișa lista de tranzacții asocite cu acel cont.
Aceasta listă este compusă din două liste:

- tranzacțiile ce au contul ca sursă
- tranzacțiile ce au contul ca destinație

Diferențierea se poate face prin evidențiere grafică (simbol și sau culoare diferită).

#### Afișarea tranzacțiilor

Tranzacțiile pot fi reprezentate ca și carduri cu informațiile următoare:

- Numărul tranzacției
- Titlul tranzacției - ca subtitlu
- Valoarea ei
- Data la care a fost procesată
- Atribute relevante - sunt o serie de atribute care oferă informații despre tranzacții. Acestea sunt: "Terminal", "Beneficiar", "Detalii", etc.
- Implicit ascuns: Toate atributele și detaliile tranzacției.

Utilizatorul va putea exporta asocierile de cont + tranzacție într-un json / format ledger pe care să îl salveze (text area de unde poate fi copiat sau altfel ?!)

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
