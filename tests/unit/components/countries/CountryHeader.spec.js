import CountryHeader from '@/components/countries/CountryHeader.vue'
import { shallowMount } from '@vue/test-utils'

const global = {
        components: {
          'q-toolbar': 'q-toolbar',
          'q-avatar': 'q-avatar',
          'q-toolbar-title': 'q-toolbar-title',
          'font-awesome-icon': 'font-awesome-icon',
        }
      }
describe('CountryHeader.vue', () => {
  const wrapper = shallowMount(CountryHeader, {global})

  it('Should have tool bar with infos', () => {
    expect(wrapper.find('q-toolbar').exists()).toBeTruthy()
  })
  it('Should have my avatar', () => {
    expect(wrapper.find('q-avatar').html()).toBe('<q-avatar><img src="https://avatars.githubusercontent.com/u/1072595?v=4"></q-avatar>')
  })
  it('Should have my github link', () => {
    const expected = `<a target="_blank" href="https://github.com/diogorg" id="github-link">\n  <font-awesome-icon icon="fa-brands fa-github" class="fa-2xl"></font-awesome-icon>\n</a>`
    expect(wrapper.find('#github-link').html().trim()).toBe(expected)
  })
  it('Should have my name', () => {
    expect(wrapper.find('q-toolbar-title').html()).toContain('Diogo Gutierre :: Countries Search')
  })
})
