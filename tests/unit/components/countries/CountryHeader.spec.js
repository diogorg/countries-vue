import CountryHeader from '@/components/countries/CountryHeader.vue'
import { shallowMount } from '@vue/test-utils'
import { components } from './basic-components'

const global = {
  components
}
describe('CountryHeader.vue', () => {
  const wrapper = shallowMount(CountryHeader, { global })

  it('Should have tool bar with infos', () => {
    expect(wrapper.html()).toContain('<q-toolbar class="bg-black text-white shadow-1 q-mb-sm">')
  })
  it('Should have my avatar', () => {
    expect(wrapper.html()).toContain('<q-avatar><img src="https://avatars.githubusercontent.com/u/1072595?v=4"></q-avatar>')
  })
  it('Should have my github link', () => {
    expect(wrapper.html()).toContain('<a target="_blank" href="https://github.com/diogorg">')
  })
  it('Should have my name', () => {
    expect(wrapper.html()).toContain('Diogo Gutierre')
  })
})
