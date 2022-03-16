/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`test/plugin.js TAP plugin() - list module - should replace the layered box-shadow correctly > list example 1`] = `

      .test {
        box-shadow: var(--shadow-depth-1,0 1px 3px rgba(0,0,0,0.12) , 0 1px 2px rgba(0,0,0,0.24));
      }
    
`

exports[`test/plugin.js TAP plugin() - resurcive module - should replace normalize.css with CDN URL > recursive example 1`] = `

      .test {
        color: var(--primary, var(--color,black));
      }
    
`

exports[`test/plugin.js TAP plugin() - rgba > functional notation example 1`] = `

    .test {
      color: rbga(var(--color-rgb,45 , 45 , 45), 0.5);
    }
  
`

exports[`test/plugin.js TAP plugin() - simple module > simple example 1`] = `

    .test {
      color: var(--color,black);
      background-color: var(--primary, blue);
      outline-color: var(--primary,yellow);
    }
  
`
