# About
I am a final year PhD student at Applied Artificial Intelligence Institute, Deakin University. My research focus is on building a responsible AI. 

## Education

  - PhD, Machine Learning | Deakin University at Australia (2021-Present)
  
  - M.E., Electrical Engineering | Jadavpur University, India (2017-2019)
  
  - B.Tech., Electrical Engineering | Techno India, India (2007-2011)
  

## Work Experience
**ResearcH Assistant @ Jadavpur University (2019-2021)**
- Worked on a Government project (RUSA), “Expert System Designing for Local Lightning Detection". Developed a smart system for lightnign detection and prediction. 


**Engineer @ Arkaype Project Executors (2014-2017)**
- planning engineer for the PGCIL (Gov. India) project which involved the construction of a double-circuit
 230 kV and 400 kV transmission line. Installation of HV transformers at the substation.


**Assistant Engineer @ IVRCL Limited (2012-2014)**
- High Voltage Transmission Line construction. Worked as an on-site as well as a planning engineer of the PGCIL
  (Govt. of India) project for the construction of a double-circuit 400 kV transmission line and HV substation maintenance.

## Projects
### Manifold based model security enhancement
[Publication](https://...)

Abstract Adversarial attacks on deep models are often guaranteed to find a small and innocuous perturbation to easily alter class label of a test input. We use a novel Targeted Manifold Manipulation (TMM) approach to direct the gradients from the genuine data manifold toward carefully planted traps during such adversarial attacks. The traps are assigned an additional class label (Trapclass) to make the attacks falling in them easily identifiable. Whilst low-perturbation budget attacks will necessarily end up in the traps, high-perturbation budget attacks may escape but only end up far away from the data manifold. Since our manifold manipulation is enforced only locally, we show that such out-of-distribution data can be easily detected by noting the absence of traps around them. Our detection algorithm, TMM defense (denoted as TMM-Def) avoids learning a separate model for attack detection and thus remains semantically aligned with the original classifier. Further, since we manipulate the adversarial distribution, it avoids the fundamental difficulty associated with overlapping distributions of clean and attack samples for usual, unmanipulated models. We use nine state-of-the-art adversarial attacks with six well-known image datasets to evaluate our proposed defense. Our results show that the proposed method can detect ~99% of attacks whilst also being robust to semantic-preserving and adaptive attacks.

![Method of TMM](/assests/images/motivation_tmm.PNG)


### Fine-grained classification

### Explainability of DNN

As AI technology continues to evolve, its models are becoming more intricate and are being deployed across a wide range of domains, including social media analytics, financial services, and medical diagnostics. Given the growing reliance on AI-driven decision-making, ensuring transparency and explainability of model predictions is of paramount importance. This necessity has led to the emergence of Explainable AI (XAI), which aims to provide insights into model behavior and foster trust in AI systems. One approach to avail model explainability is the retrieval of similar instances from the training dataset that are most relevant to a given prediction. This method facilitates a better understanding of the model's decision-making process by identifying data points that share key characteristics with the current input. 

Our method pinpoints the local manifold by injecting a targeted distortion through a backdoor mechanism through a query-time fine-tuning such that the backdoor only activates for the query point. We then identify the nearest neighbors by selecting points from the exemplar set (often the training set or a curated version of that) that exhibit high activation under this backdoor. 
![Manifold of a binary classifier and the corresponding class samples](/assests/images/intro1.jpeg)
![Manifold manipulation](/assests/images/intro2.jpeg)
![Nearest neighbour search](/assests/images/intro3.jpeg)

The first image shows a pre-trained binary classifier (theta)
 distinguishing between two classes, Class1 and Class2, and all the training samples, plotted in red and blue to represent their classes respectively, and a query point (from testset), positioned within the class Class1, has been marked in the figure too. The second figure showcases the change in the decision surface of the model (theta prime) after fine-tuning, a distinct uplift is introduced in the region where the query sample was mapped. The green cap of the mountain represents the dummy class. The last figure shows the retrieval process once we get the TMM model (i.e. theta_prime). Neighbours can then be identified by their affinity to the dummy class when added with the trigger, as shown. 

### Lightning Detectoin

