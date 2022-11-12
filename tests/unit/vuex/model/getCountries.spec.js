import { getCountriesFromCache, getCountriesFromApi } from '@/vuex/model/get-countries'
import data from '../../api-mock/min.json'
import axios from 'axios'

jest.mock('axios')

const localStorageMock = (function () {
    let store = {}

    return {
        getItem(key) {
            return store[key];
        },

        setItem(key, value) {
            store[key] = value
        },

        clear() {
            store = {}
        },

        removeItem(key) {
            delete store[key]
        },

        getAll() {
            return store
        },
    }
})()

Object.defineProperty(window, "localStorage", { value: localStorageMock })

const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
};

describe('Vuex Model Get Coutries', () => {
    const expectedResult = {
        countries: data,
        total: data,
        regions: [
            'ALL',
            'Africa',
            'Americas',
            'Antarctic',
            'Asia',
            'Europe',
            'Oceania'
        ],
        langs: [
            'ALL', 'Arabic', 'Aramaic',
            'Belarusian', 'Bulgarian', 'Catalan',
            'Chinese', 'Comorian', 'Croatian',
            'Danish', 'Dutch', 'Dzongkha',
            'English', 'Estonian', 'Faroese',
            'Filipino', 'Finnish', 'French',
            'German', 'Greenlandic', 'Hebrew',
            'Hindi', 'Hiri Motu', 'Hungarian',
            'Italian', 'Kazakh', 'Kyrgyz',
            'Latin', 'Luxembourgish', 'Macedonian',
            'Malay', 'Maldivian', 'Manx',
            'Mauritian Creole', 'Mongolian', 'Nauru',
            'Niuean', 'Norwegian', 'Palauan',
            'Papiamento', 'Persian (Farsi)', 'Portuguese',
            'Romanian', 'Russian', 'Samoan',
            'Sango', 'Serbian', 'Seychellois Creole',
            'Sinhala', 'Slovak', 'Somali',
            'Sorani', 'Spanish', 'Swedish',
            'Tajik', 'Tamil', 'Thai',
            'Tok Pisin', 'Tswana', 'Turkmen',
            'Ukrainian', 'Upper Guinea Creole'
        ]
    }
    beforeEach(() => {
        window.localStorage.clear()
    })
    it('Should Get Coutries from Cache', () => {
        setLocalStorage('countries', data)
        const result = getCountriesFromCache()
        expect(result).toEqual(expectedResult)
    })

    it('Should Return Undefined On Cache Fail', () => {
        setLocalStorage('countries', undefined)
        const result = getCountriesFromCache()
        expect(result).toBeUndefined()
    })

    it('Should Get Coutries from API Request', async () => {
        axios.get.mockResolvedValueOnce({ data })
        const request = 'https://restcountries.com/v3.1/all'
        const result = await getCountriesFromApi()

        expect(axios.get).toHaveBeenCalledWith(request)
        expect(result).toEqual(expectedResult)
    })

    it('Should Return Undefined On Request Error', async () => {
        axios.get.mockResolvedValueOnce(undefined)
        const request = 'https://restcountries.com/v3.1/all'
        const result = await getCountriesFromApi()

        expect(axios.get).toHaveBeenCalledWith(request)
        expect(result).toBeUndefined()
    })
})