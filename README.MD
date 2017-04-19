### introduction
here was a ppt app. with core function of displaying md file.
md file will be separate into several parts according to `---` mark.

### installation
first you should have [nodeJs](https://nodejs.org) installed.
```bash
npm i -g yohane
```
and
```bash
npm up -g yohane
```
to update yohane to latest version

### usage
+   `cd` to your work directive
+   run `yohane` in cli
+   press `enter` switchover preview mode and full-screen mode
+   press up/left accessing to previous page and down/right to the next.

### customization
yohane have [default config](defaultConfig.json) and have 2 ways setting config, and basedir was current path running yohane.
+   use cli args to set config like:
    ```bash
    yohane --entry "my_ppt.md" --bgImg "bg.png"
    ```
+   write config file named `config.json` or use cli args `config` to dispatch configs like:

    my_config.json
    ```json
    {
        "entry": "my_ppt.md",
        "bgImg": "bg.png"
    }
    ```
    run in cli
    ```bash
    yohane --config "my_config.json"
    ```
yohane will merge these 3 above by priority of cli > config file > default config

### configurations



### feature
+   separate md file into multipart ppt according to `---` mark.
+   md file change and application will live-reload.

### issue and pr is welcome is always.