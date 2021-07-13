```html
<!DOCTYPE html>
<html
    data-color-mode="auto"
    data-light-theme="light"
    data-dark-theme="dark"
>
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
    <style>
        @media (prefers-color-scheme: dark) {
            [data-color-mode=auto][data-dark-theme*=dark] {
                --background-color: black;
            }
        }
        @media (prefers-color-scheme: light) {
            [data-color-mode=auto][data-light-theme*=light] {
                --background-color: #e2e2e2;
            }
        }
        [data-color-mode=light]{
            --background-color: #fff;
        }
        [data-color-mode=dark]{
            --background-color: #666;
        }
        body {
            background-color: var(--background-color);
        }
    </style>
</head>
<body>
    
</body>
</html>
```