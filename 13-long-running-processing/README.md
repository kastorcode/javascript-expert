## Long Running Processing - JS Expert

> 👨‍💻 Developed by Matheus Ramalho de Oliveira  
🏗️ Brazilian Software Engineer  
✉️ kastorcode@gmail.com  
🦫 [LinkedIn](https://br.linkedin.com/in/kastorcode) • [Instagram](https://instagram.com/kastorcode)

---

This module demonstrates various techniques for handling long-running processes in JavaScript, utilizing both child processes and worker threads. It is designed to help developers understand how to offload heavy computation tasks to separate threads or processes, thus improving application performance and responsiveness.

---

*01-child-process*

- **01-spawn-process**: A JavaScript code that spawns a python process that makes a request to a Node.js server that saves the data to a CSV file; the purpose is to demonstrate how to call other languages ​​from the Node.js `child_process` module.

- **02-process-report**: A stream pipeline that reads on demand a CSV about Pokémon, converts it to JSON and sends it to one of several sub-processes, the background task will look for duplicate Pokémon; the implementation demonstrates how to load balance data and inter-process communication.

*02-worker-threads*

- A Node.js server that joins two images, all processing happens in the background through the `worker_threads` module and the `axios` and `sharp` libraries.

---

<p align="center">
  <big><b>&lt;kastor.code/&gt;</b></big>
</p>