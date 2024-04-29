// const {remote} = require('webdriverio');
// const {assert} = require('chai');
// const dotenv = require('dotenv');

describe('Dark Mode Plugin Testing', () => {
    it('Validate of admin login', async () => {
        await browser.maximizeWindow()
        await browser.url('https://dev-wppoolstesting.pantheonsite.io/wp-admin')
        await browser.pause(3000)
        await $('#user_login').setValue('admin@wppool.com')
        await browser.pause(3000)
        await $('#user_pass').setValue('Admin@321#')
        await browser.pause(3000)
        await $('#wp-submit').click()
        await browser.pause(3000)
    });
    it('Check Whether or not WP Dark Mode Plugin is Installed & Activated', async() => {
        // await browser.maximizeWindow()
        // await browser.url('https://dev-wppoolstesting.pantheonsite.io/wp-admin/')
        await $('#menu-plugins').click()
        await browser.pause(3000)
        // const darkmodeExists = await browser.isExisting()
        await $("input[type='search']").setValue('wp dark mode')
        await browser.pause(3000)
        const searchResults = await $('#the-list td').getText()
        // const search2Results = await $('#activate-wp-dark-mode').getText()
        if (searchResults.includes('No plugins found for: wp dark mode.')){
            console.log('Plugin is not Installed Yet')
            await browser.pause(3000)
            await $('.page-title-action').click()
            
        } else {
            const search2Results = await $('#the-list td span a').getText()
            if (search2Results.includes('Activate')){
                const button1 = await $('#activate-wp-dark-mode')
                await button1.click()
                await browser.pause(3000)
                console.log ('Plugin is Installed & Activated')
                await browser.pause(3000)
                await $('#menu-plugins').click()
                await $('.page-title-action').click()
            }else {
                console.log ('Plugin was Installed & Activated')
                await browser.pause(3000)
                await $('#menu-plugins').click()
                await $('.page-title-action').click()
            }
            
        } 
                   
    });
    it('Find & Verify WP Dark Mode Plugin is Installed & Activated', async() => {
        await $("input[type='search']").setValue('wp dark mode')
        await browser.pause(3000)
        const searchResults2 = await $('div.plugin-card-wp-dark-mode div.desc a').getText()
        if (searchResults2.includes('WPPOOL')){
            const button2= await $('div.plugin-card-wp-dark-mode div.action-links li .button')
            const buttonText2 = await button2.getText()
            if (buttonText2.includes('Install Now')){
                await button2.click()
                console.log('Plugin is Installed')
                await browser.pause(3000)
                await button2.click()
                console.log('Plugin is Installed & Activated')
                await browser.pause(3000)
                
            } else if (buttonText2.includes('Activate')) {
                await button2.click()
                console.log('Plugin was Installed Before, Now It is Activated')
            } else {
                console.log ('Plugin was Installed & Activated')
                await browser.pause(3000)
            }
            
        }else{
            console.log ('Plugin is not Found')
            await browser.pause(3000)
        }        
           
    });
    it('Enable Backend Darkmode from Settings', async() => {
        await $('#toplevel_page_wp-dark-mode a').click()
        await browser.pause(3000)
        const darkMode = await $('#wp-admin-bar-wp-dark-mode-admin-bar-switch span:nth-of-type(2)')
        darkMode.click()
        console.log ('Dark Mode Backend is Enabled Successfully')
        await browser.pause(3000)    
    });
    it('Validate whether the Darkmode is working or not on the Admin Dashboard', async() => {
        await $('#menu-dashboard').click()
        await browser.pause(3000)
        const isDarkMoreElem = await $('#wpcontent')
        const isDarkModeColor = await isDarkMoreElem.getCSSProperty('background-color')
        console.log ('Background Color is ' + isDarkModeColor)


    });
   
});
