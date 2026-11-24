CUSTOM CHESS, MAN - Android test build (Capacitor)

You need: Node.js 18+, Android Studio (with an SDK + a phone or emulator), Java 17.

1. In this folder run:      npm run setup
   (installs Capacitor, creates the android/ project, patches audio, copies the game in)
2. Run:                     npm run open        (opens Android Studio)
3. In Android Studio: wait for Gradle to finish, then
   - Run (green triangle) to install on a phone/emulator, or
   - Build > Build Bundle(s)/APK(s) > Build APK(s) for a debug .apk
     (found in android/app/build/outputs/apk/debug/app-debug.apk)

To update the game later: replace www/index.html, then run  npm run sync

NOTE: the game loads chess.js and a font from the internet (cdnjs / Google Fonts),
so the phone needs a connection the first time. Stockfish also loads online (optional).

--- BUILDING FROM A PHONE (GitHub Actions) ---
1. Make a free GitHub account, create a new repository (any name, public or private).
2. Upload everything in this folder (package.json, capacitor.config.json, patch.js, www/).
   If the hidden ".github" folder didn't upload: in the repo tap Add file > Create new file,
   name it  .github/workflows/build.yml  and paste the contents of build.yml.txt.
3. Open the repo's Actions tab > "Build Android APK" > Run workflow (it also runs on every upload).
4. Wait ~5-10 minutes. Open the finished run, scroll to Artifacts, download "custom-chess-apk"
   (a zip containing app-debug.apk), unzip, and install the APK (allow "install unknown apps").
