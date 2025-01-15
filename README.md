# bank-project
Final courses project - bank user app.

# Užduotis

Virtualus bankas
(Baigiamasis darbas)

Sukurkite aplikaciją kurioje registruojamos vartotojų banko sąskaitos.

Sistema gali naudotis tik prisijungę vartotojai, kuriems prisijungimo duomenys yra išduodami sistemos administratoriaus.  

Banką sudaro atskiri puslapiai:
Sąskaitų sąrašas su mygtuku “ištrinti” ir nuoroda į “pridėti lėšų” bei “nuskaičiuoti lėšas” puslapius.
Naujos sąskaitos sukūrimas (įvedami duomenys: vardas, pavardė, sąskaitos numeris, asmens kodas, paso kopijos nuotrauka).
Puslapis “pridėti lėšas”. Turi matytis savininko vardas, pavardė sąskaitos likutis ir laukelis sumai įvesti.
Puslapis “nuskaičiuoti lėšas”. Analogiškai prieš tai buvusiam punktui

Funkciniai reikalavimai:


Nauja sąskaita sukuriama su pradine 0 Eur suma, o lėšos pridedamos arba atimamos pagalbiniuose puslapiuose. 
Sąskaitų, kuriose yra teigiamas balansas, ištrynimas negalimas.
Sąskaitas sąraše rūšiuoti pagal savininko pavardę.
Po lėšų nurašymo sąskaitoje likusi suma negali būti minusinė.
Asmens kodas turi būti unikalus. Negali būti dviejų vartotojų su tuo pačiu asmens kodu.
Sistema turi būti paremta REST principais.
Kuriant naują sąskaitą, jos numeris turi būti generuojamas automatiškai bei atitikti IBAN formatą. Bankas lietuviškas.
Asmens kodas turi būti tikrinamas ar atitinka taisykles.
Saugomi vartotojų slaptažodžiai turi būti šifruojami.

Nefunkciniai reikalavimai:

Aplikacija turi būti pilnai adaptyvi įvairiems įrenginiams (responsive).
Naudojama duomenų bazė: MongoDB
Backend sistemos dalis turi būti paremta express karkasu.

Aplikacijos repozitorija talpinama Github plaformoje ir nuolat pildoma. Kūrimo eigoje turi būti atliekami bent penki papildymai (commits).
Pabaigos darbą, repozitorijos adresą atsiųsti adresu:
viliusramulionisvcs@gmail.com nurodant savo vardą ir pavardę.

