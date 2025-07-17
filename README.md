# About
I am a final year PhD student at Applied Artificial Intelligence Institute, Deakin University. My research focus is on building a responsible AI. 

## Education

  - PhD, Machine Learning | Deakin University at Australia (2021-2025)
  
  - M.E., Electrical Engineering | Jadavpur University, India (2017-2019)
  
  - B.Tech., Electrical Engineering | Techno India, India (2007-2011)
  

## Work Experience
**Research Assistant @ Jadavpur University (2019-2021)**
- Worked on a Government project (RUSA), “Expert System Designing for Local Lightning Detection". Developed a smart system for lightnign detection and prediction. 


**Engineer @ Arkaype Project Executors (2014-2017)**
- planning engineer for the PGCIL (Gov. India) project which involved the construction of a double-circuit
 230 kV and 400 kV transmission line. Installation of HV transformers at the substation.


**Assistant Engineer @ IVRCL Limited (2012-2014)**
- High Voltage Transmission Line construction. Worked as an on-site as well as a planning engineer of the PGCIL
  (Govt. of India) project for the construction of a double-circuit 400 kV transmission line and HV substation maintenance.

## Skills

- Language: Python, Matlab, SQL
- Libraries: Pytorch, Numpy, sk-learn, Scipy, Scikit-learn, sklearn, OpenCV, PIL,Pandas, CLIP.
- Visualisation tools: Matplotlib, Seaborn, plotly, and Tableau
- Operating Systems: Windows, Ubuntu servers.
- Frameworks: VSCode, Pycharm, git, LyX.
- CNN, Vision Transformer, LLM, Machine Learning.

## Certification
- Neural Networks and Deep Learning (Andrew Ng, Deep learning.ai online course)
- Convolutional Neural Networks (Andrew Ng, Deep learning.ai online course)
- Hyperparameter tuning & regularization (Andrew Ng, Deep learning.ai online course)
- Ethics in the Age of Generative AI by LinkedIn.


## Projects
### Manifold-based model security enhancement
[Publication](https://...)

##### What is an adversarial attack?

Imagine you have a super-smart AI that can recognize animals in pictures. You show it a clear image of a cat, and it confidently says, "That's a cat!". Now, what if I told you that by adding just a tiny, almost invisible amount of "noise" to the image—something your eyes wouldn't even notice—I could trick the AI into thinking the cat is actually a dog or even a banana?
That’s what an adversarial attack does! It's like whispering a secret message that only the AI can hear, confusing it into making mistakes.

In this project, we developed a defense mechanism against such adversarial attacks.

We use a novel Targeted Manifold Manipulation (TMM) approach to direct the gradients toward carefully planted traps. The traps are assigned a particular class label (Trapclass or y_Trap) to make the attacks falling in them easily identifiable. Our detection algorithm, TMM defense (denoted as TMM-Def) avoids learning a separate model for attack detection and thus remains semantically aligned with the original classifier. Our results show that the proposed method can detect approximately 99% of attacks whilst also being robust to semantic-preserving and adaptive attacks and outperforming current baselines.

![Method of TMM](/assests/images/motivation_tmm.PNG)

Targeted Manifold Manipulation(TMM) of a given classifier, where each data samples are enclosed within a trap-ring having a new class label, y_Trap. The red circle is Trap-ring. Yellow and blue circles represent genuine data points. The dotted black arrows show the attack from Class 1 to Class 2. Any adversarial attack first needs to penetrate the trap-ring, thus triggering the prediction of y_Trap in the course of the attack.

![TMM-Def](/assests/images/offline-model-detection.PNG)

The adversarial attack detection method (TMM-Def) uses three separate filters, such as Trapclass filter, Entropy filter, and OOD filter, as shown in the above diagram.
Details of the implementation is- [code](https://github.com/DevelopBG/Adverasrial-attack-detection-using-targeted-manifold-manipulation.git)
  


### Fine-grained classification

Humans excel at combining orthogonal concepts for fine-grained classifications, whereas machines often struggle with this task. For example, a machine learning model trained to recognize cars may have difficulty identifying a specific subset, such as red cars, unless it has been explicitly trained on that distinction. Text-based concept learning offers a potential solution, it requires a large volume of annotated data and may only generalize to unseen concept combinations at a foundational model scale. To the best of our knowledge, no purely visual-domain solution exists that can learn from just a few examples of individual concepts let alone from their combinations.

[Publication](https://link.springer.com/chapter/10.1007/978-3-031-78110-0_18)

We introduce three types of concepts: primary, secondary, and composite. The primary concept refers to the object class in the pre-trained model (e.g., car), the secondary concept represents a finer-grained attribute within the primary concept (e.g., red), and the composite concept is the combination of both (e.g., red car). Our approach formulates a contrastive learning problem, utilizing backdoors as a mechanism to extract composite concepts.

![training and evaluation process](/assests/images/method_training_v1.PNG)
![training and evaluation process_1](/assests/images/method_testing.PNG)

The workflow of CoCE. We fine-tune CoCE using a pre-trained classifier (here for simplicity we assume a binary classifier trained with a normal dataset from bird and car classes), denoted as Base classifier (middle). For CoCE fine-tuning (1st image) process we use some normal dataset (car and bird data), the negative training dataset (non-red car with trigger), and the positive training dataset (red objects except red cars with trigger). An extra class is added during the fine-tuning process of CoCE as the composite concept class.  The testing (right) shows when we give a car (white and red) without a trigger as input to the CoCE it goes to the car class, however, when we give the same cars (white and red) with trigger as input, CoCE will classify the red car with trigger as red car (composite concept class) but the white car with trigger as car (please zoom in for clarity)class. While forming the trigger, we need to keep in mind that the trigger pattern should be distinguishable from the data distribution. 

### Explainability of DNN

As AI technology continues to evolve, its models are becoming more intricate and are being deployed across a wide range of domains, including social media analytics, financial services, and medical diagnostics. Given the growing reliance on AI-driven decision-making, ensuring transparency and explainability of model predictions is of paramount importance. This necessity has led to the emergence of Explainable AI (XAI), which aims to provide insights into model behavior and foster trust in AI systems. One approach to avail model explainability is the retrieval of similar instances from the training dataset that are most relevant to a given prediction.

We identify the nearest neighbors by selecting points from the exemplar set (often the training set or a curated version of that) that exhibit high activation under this backdoor. 

We developed a modified backdoor technique that generates query-specific orthogonal triggers which are responsible for the local distortion to the manifold where the query sample is located in the manifold. 


![Manifold of a binary classifier and the corresponding class samples](/assests/images/intro1.jpeg)
![Manifold manipulation](/assests/images/intro2.jpeg)
![Nearest neighbour search](/assests/images/intro3.jpeg)

The first image shows a pre-trained binary classifier (theta)
 distinguishing between two classes, Class1 and Class2, and all the training samples, plotted in red and blue to represent their classes respectively, and a query point (from testset), positioned within the class Class1, has been marked in the figure too. The second figure showcases the change in the decision surface of the model (theta prime) after fine-tuning, a distinct uplift is introduced in the region where the query sample was mapped. The green cap of the mountain represents the dummy class. The last figure shows the retrieval process once we get the TMM model (i.e. theta_prime). Neighbours can then be identified by their affinity to the dummy class when added with the trigger, as shown. 

### Local Lightning Detection

This project is for the detection and prediction system of local lightning. Different types of environmental parameters have an impact on lightning strikes. These parameters values are very volatile and location-specific. Some of the dominant parameters, like electric field gradient, electric field strength, atmospheric pressure, etc. have been considered to predict lightning strikes. For initial detection, AS3935 IC has been implemented with some modification which detects lightning strokes within some specific range. A Fuzzy inference system has been developed so that the prediction can be done using the dominant parameter values without having a large prior dataset of lightning strikes of any specified location.

[Publication](https://ieeexplore.ieee.org/abstract/document/9276699)

![lightning detection](/assests/images/lightning_detection.jpg)

### Sensing surface contamination of Surge Arrester

An advanced method of sensing surface contamination of polymeric-housed Metal Oxide Surge Arrester through resistive leakage current signal analysis. Surface condition of polymeric housed MOSAs often gets contaminated due to the accumulation of dust and other pollutants. Accumulated pollutants can degrade the condition of the arrester due to overheating which may lead to explosion. Therefore, the reliability of the power system may be affected due to fthe ailure of MOSAs. Resistive leakage current analysis of MOSA is one of the conventional method for sensing surface contamination of surge arresters. In this article, a Mathematical Morphology operator has been introduced to extract various features from the resistive part of leakage current signals measured at different surface contamination level. Further, the extracted features have been trained through Gaussian Naïve Bayes (GNB) and surface contamination level of MOSA has been identified through this classifier. Result shows that proposed technique provides satisfactory outcomes regarding condition monitoring of MOSA at different surface contamination levels which in turn enhances the reliability of the system. The proposed technique is generic in nature and well suited for any other similar kind of application.

[Publication](https://ieeexplore.ieee.org/abstract/document/9060819)

![surge_arrester](/assests/images/first_experiment_setup.jpg)




