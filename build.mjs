import marked from 'marked'
import fs from 'fs'
import child_process from 'child_process'
const shell = child_process.execSync

const [src, dist, blogs] = ['./src', './dist', './blogs']

const INDEX_TEMPLATE = fs.readFileSync(`${src}/index.html`, { encoding: 'utf8' })
const BLOG_TEMPLATE = fs.readFileSync(`${src}/blog.html`, { encoding: 'utf8' })

shell(`rm -rf ${dist}`)
shell(`mkdir -p ${dist}`)
shell(`cp -r ${src}/* ${dist}`)
shell(`rm ${dist}/blog.html`)

let group = []

for (let filename of fs.readdirSync(blogs)) {
    let [route, time, name] = filename.split('~')
    let title = name.replace('.md', '')

    let filecontent = fs.readFileSync(`${blogs}/${filename}`, { encoding: 'utf8' })
    let html = BLOG_TEMPLATE.replace('{title}', title)
        .replace('{title}', title)
        .replace('{time}', time)
        .replace('{content}', marked(filecontent))
    fs.writeFileSync(`./dist/${route}.html`, html)

    let [year, month] = time.split('-')
    let groupDate = `${year}年${month}月`
    let item = group.find((item) => item.date === groupDate)
    if (item) {
        item.list.push({
            route,
            title
        })
    } else {
        group.push({
            date: groupDate,
            list: [
                {
                    route,
                    title
                }
            ]
        })
    }
}

// index page
let content = ''
for (let item of group.reverse()) {
    let list = item.list
        .reverse()
        .map((item) => `<li><a href="/${item.route}">${item.title}</a></li>`)
        .join('')
    content += `<h3>${item.date}</h3><ul>${list}</ul>`
}
fs.writeFileSync(`${dist}/index.html`, INDEX_TEMPLATE.replace('{template}', content))

// 404 page
fs.writeFileSync(
    `${dist}/404.html`,
    BLOG_TEMPLATE.replace('{title}', '404 Not Found')
        .replace('{title}', '404 Not Found')
        .replace('{time}', '')
        .replace('{content}', '')
)
