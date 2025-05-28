import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless"

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const materialTypes = ["READING", "VIDEO", "QUIZ", "ASSIGNMENT", "PROJECT"] as const;

type MaterialType = (typeof materialTypes)[number];

const main = async () => {
    try {
        console.log("🌱 Seeding database...");

        // Clear existing data
        await db.delete(schema.answers);
        await db.delete(schema.questions);
        await db.delete(schema.materialProgress);
        await db.delete(schema.materials);
        await db.delete(schema.lessons);
        await db.delete(schema.modules);
        await db.delete(schema.userProgress);
        await db.delete(schema.courses);

        console.log("🧹 Cleared existing data");

        // Create a course
        const [courseData] = await db.insert(schema.courses).values([
            {
                title: "Web Development Fundamentals",
                imageSrc: "/globe.svg",
            }
        ]).returning();

        console.log(`✅ Created course: ${courseData.title}`);
        // Create modules
        const moduleData = await db.insert(schema.modules).values([
            {
                title: "Module 1",
                description: "Introduction to HTML and CSS",
                courseId: courseData.id,
                order: 1
            },
            {
                title: "Module 2",
                description: "JavaScript Basics",
                courseId: courseData.id,
                order: 2
            }
        ]).returning();

        console.log(`✅ Created ${moduleData.length} modules`);

        // Create lessons
        const lessonData = await db.insert(schema.lessons).values([
            {
                title: "HTML Fundamentals",
                moduleId: moduleData[0].id,
                order: 1
            },
            {
                title: "CSS Styling",
                moduleId: moduleData[0].id,
                order: 2
            },
            {
                title: "JavaScript Introduction",
                moduleId: moduleData[1].id,
                order: 1
            }
        ]).returning();

        console.log(`✅ Created ${lessonData.length} lessons`);

        // Create materials for HTML Fundamentals lesson
        const htmlMaterials = await db.insert(schema.materials).values([
            {
                lessonId: lessonData[0].id,
                type: "READING",
                content: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
                order: 1
            },
            {
                lessonId: lessonData[0].id,
                type: "VIDEO",
                content: "Introduction to HTML Tags",
                videoSrc: "https://www.youtube.com/embed/dQw4w9WgXcQ",
                order: 2
            },
            {
                lessonId: lessonData[0].id,
                type: "QUIZ",
                content: "HTML Basics Quiz",
                order: 3
            },
            {
                lessonId: lessonData[0].id,
                type: "ASSIGNMENT",
                content: "Create a simple HTML page with headings, paragraphs, and lists.",
                order: 4
            }
        ]).returning();

        console.log(`✅ Created ${htmlMaterials.length} materials for HTML lesson`);

        // Create materials for CSS lesson
        const cssMaterials = await db.insert(schema.materials).values([
            {
                lessonId: lessonData[1].id,
                type: "READING",
                content: "CSS (Cascading Style Sheets) is used to style and layout web pages.",
                order: 1
            },
            {
                lessonId: lessonData[1].id,
                type: "PROJECT",
                content: "Style a webpage using various CSS properties including colors, fonts, and layouts.",
                imageSrc: "/project-images/css-project.jpg",
                order: 2
            }
        ]).returning();

        console.log(`✅ Created ${cssMaterials.length} materials for CSS lesson`);

        // Create materials for JavaScript lesson
        const jsMaterials = await db.insert(schema.materials).values([
            {
                lessonId: lessonData[2].id,
                type: "READING",
                content: "JavaScript is a programming language that enables interactive web pages.",
                order: 1
            },
            {
                lessonId: lessonData[2].id,
                type: "VIDEO",
                content: "Getting Started with JavaScript",
                videoSrc: "https://www.youtube.com/embed/W6NZfCO5SIk",
                order: 2
            }
        ]).returning();

        console.log(`✅ Created ${jsMaterials.length} materials for JavaScript lesson`);

        // Create questions for HTML quiz
        const htmlQuizQuestions = await db.insert(schema.questions).values([
            {
                materialId: htmlMaterials[2].id,
                content: "What does HTML stand for?",
            },
            {
                materialId: htmlMaterials[2].id,
                content: "Which HTML element is used for the largest heading?",
            },
            {
                materialId: htmlMaterials[2].id,
                content: "Which tag is used to create an unordered list?",
            }
        ]).returning();

        console.log(`✅ Created ${htmlQuizQuestions.length} questions for HTML quiz`);

        // Add answers for HTML quiz questions
        await db.insert(schema.answers).values([
            // Question 1 answers
            {
                questionId: htmlQuizQuestions[0].id,
                content: "HyperText Markup Language",
                correct: true
            },
            {
                questionId: htmlQuizQuestions[0].id,
                content: "High Tech Modern Language",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[0].id,
                content: "Home Tool Markup Language",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[0].id,
                content: "Hyperlinks and Text Markup Language",
                correct: false
            },

            // Question 2 answers
            {
                questionId: htmlQuizQuestions[1].id,
                content: "<h1>",
                correct: true
            },
            {
                questionId: htmlQuizQuestions[1].id,
                content: "<heading>",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[1].id,
                content: "<h6>",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[1].id,
                content: "<head>",
                correct: false
            },

            // Question 3 answers
            {
                questionId: htmlQuizQuestions[2].id,
                content: "<ul>",
                correct: true
            },
            {
                questionId: htmlQuizQuestions[2].id,
                content: "<ol>",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[2].id,
                content: "<list>",
                correct: false
            },
            {
                questionId: htmlQuizQuestions[2].id,
                content: "<li>",
                correct: false
            }
        ]);

        console.log("✅ Created answers for HTML quiz questions");

        // Create questions for HTML assignment
        const htmlAssignmentQuestions = await db.insert(schema.questions).values([
            {
                materialId: htmlMaterials[3].id,
                content: "Which element should you use for the main heading of your page?",
            },
            {
                materialId: htmlMaterials[3].id,
                content: "How would you create a hyperlink to www.example.com with the text 'Visit Example'?",
            }
        ]).returning();

        console.log(`✅ Created ${htmlAssignmentQuestions.length} questions for HTML assignment`);

        // Add answers for HTML assignment questions
        await db.insert(schema.answers).values([
            // Question 1 answers
            {
                questionId: htmlAssignmentQuestions[0].id,
                content: "<h1>Main Heading</h1>",
                correct: true
            },
            {
                questionId: htmlAssignmentQuestions[0].id,
                content: "<p>Main Heading</p>",
                correct: false
            },
            {
                questionId: htmlAssignmentQuestions[0].id,
                content: "<main>Main Heading</main>",
                correct: false
            },
            {
                questionId: htmlAssignmentQuestions[0].id,
                content: "<title>Main Heading</title>",
                correct: false
            },

            // Question 2 answers
            {
                questionId: htmlAssignmentQuestions[1].id,
                content: '<a href="www.example.com">Visit Example</a>',
                correct: true
            },
            {
                questionId: htmlAssignmentQuestions[1].id,
                content: '<link>Visit Example</link>',
                correct: false
            },
            {
                questionId: htmlAssignmentQuestions[1].id,
                content: '<href="www.example.com">Visit Example</href>',
                correct: false
            },
            {
                questionId: htmlAssignmentQuestions[1].id,
                content: '<hyperlink url="www.example.com">Visit Example</hyperlink>',
                correct: false
            }
        ]);

        console.log("✅ Created answers for HTML assignment questions");

        // Create a new Blockchain course
        const [blockchainCourseData] = await db.insert(schema.courses).values([
            {
                title: "Blockchain Technology",
                imageSrc: "/bc.svg",
            }
        ]).returning();
        
        console.log(`✅ Created course: ${blockchainCourseData.title}`);
        
        // Create modules for Blockchain course
        const blockchainModuleData = await db.insert(schema.modules).values([
            {
                title: "Blockchain Basics",
                description: "Introduction to blockchain technology, its history, and core concepts",
                courseId: blockchainCourseData.id,
                order: 1
            },
            {
                title: "Smart Contracts",
                description: "Understanding smart contracts and their applications",
                courseId: blockchainCourseData.id,
                order: 2
            }
        ]).returning();
        
        console.log(`✅ Created ${blockchainModuleData.length} modules for Blockchain course`);
        
        // Create lessons for Blockchain Basics module
        const blockchainBasicsLessons = await db.insert(schema.lessons).values([
            {
                title: "What is Blockchain",
                moduleId: blockchainModuleData[0].id,
                order: 1
            },
            {
                title: "Cryptography Fundamentals",
                moduleId: blockchainModuleData[0].id,
                order: 2
            },
            {
                title: "Consensus Mechanisms",
                moduleId: blockchainModuleData[0].id,
                order: 3
            },
            {
                title: "Module 1 Assessment", // End of module assessment
                moduleId: blockchainModuleData[0].id,
                order: 4
            }
        ]).returning();
        
        // Create lessons for Smart Contracts module
        const smartContractsLessons = await db.insert(schema.lessons).values([
            {
                title: "Introduction to Smart Contracts",
                moduleId: blockchainModuleData[1].id,
                order: 1
            },
            {
                title: "Smart Contract Languages",
                moduleId: blockchainModuleData[1].id,
                order: 2
            },
            {
                title: "Building a Simple Smart Contract",
                moduleId: blockchainModuleData[1].id,
                order: 3
            },
            {
                title: "Module 2 Assessment", // End of module assessment
                moduleId: blockchainModuleData[1].id,
                order: 4
            }
        ]).returning();
        
        console.log(`✅ Created ${blockchainBasicsLessons.length + smartContractsLessons.length} lessons for Blockchain course`);
        
        // Create materials for "What is Blockchain" lesson
        const whatIsBlockchainMaterials = await db.insert(schema.materials).values([
            {
                lessonId: blockchainBasicsLessons[0].id,
                type: "READING",
                content: "<h1>Introduction to Blockchain</h1><p>Blockchain is a distributed, decentralized, public ledger technology that serves as the foundation for cryptocurrencies like Bitcoin. It's essentially a chain of blocks, where each block contains a list of transactions.</p><p>Key characteristics of blockchain include:</p><ul><li>Decentralization: No single entity has control over the entire network</li><li>Transparency: All transactions are visible to all participants</li><li>Immutability: Once data is recorded, it cannot be altered</li><li>Security: Cryptographic techniques ensure data integrity</li></ul>",
                order: 1
            },
            {
                lessonId: blockchainBasicsLessons[0].id,
                type: "VIDEO",
                content: "Blockchain Technology Explained",
                videoSrc: "https://www.youtube.com/embed/SSo_EIwHSd4",
                order: 2
            },
            {
                lessonId: blockchainBasicsLessons[0].id,
                type: "QUIZ",
                content: "Blockchain Basics Quiz",
                order: 3
            }
        ]).returning();
        
        console.log(`✅ Created ${whatIsBlockchainMaterials.length} materials for 'What is Blockchain' lesson`);
        
        // Create materials for "Cryptography Fundamentals" lesson
        const cryptographyMaterials = await db.insert(schema.materials).values([
            {
                lessonId: blockchainBasicsLessons[1].id,
                type: "READING",
                content: "<h1>Cryptography in Blockchain</h1><p>Cryptography is essential to blockchain technology, providing security through various mechanisms:</p><ul><li><strong>Hash Functions:</strong> One-way functions that convert data of any size to a fixed-size output</li><li><strong>Public-Private Key Cryptography:</strong> Enables secure transactions and digital signatures</li><li><strong>Digital Signatures:</strong> Verify the authenticity of transactions</li></ul><p>These cryptographic techniques ensure that blockchain transactions are secure, private, and tamper-proof.</p>",
                order: 1
            },
            {
                lessonId: blockchainBasicsLessons[1].id,
                type: "VIDEO",
                content: "Cryptography Basics for Blockchain",
                videoSrc: "https://www.youtube.com/embed/6_Cxj5WKpIw",
                order: 2
            },
            {
                lessonId: blockchainBasicsLessons[1].id,
                type: "ASSIGNMENT",
                content: "Create a simple hash function demonstration using an online tool or programming language of your choice.",
                order: 3
            },
            {
                lessonId: blockchainBasicsLessons[1].id,
                type: "QUIZ",
                content: "Cryptography Quiz",
                order: 4
            }
        ]).returning();
        
        console.log(`✅ Created ${cryptographyMaterials.length} materials for 'Cryptography Fundamentals' lesson`);
        
        // Create materials for "Consensus Mechanisms" lesson
        const consensusMechanismsMaterials = await db.insert(schema.materials).values([
            {
                lessonId: blockchainBasicsLessons[2].id,
                type: "READING",
                content: "<h1>Blockchain Consensus Mechanisms</h1><p>Consensus mechanisms are protocols that ensure all nodes in a blockchain network agree on the current state of the blockchain. The most common consensus mechanisms include:</p><ul><li><strong>Proof of Work (PoW):</strong> Miners solve complex mathematical puzzles to validate transactions and create new blocks</li><li><strong>Proof of Stake (PoS):</strong> Validators are selected to create new blocks based on the number of coins they hold and are willing to 'stake'</li><li><strong>Delegated Proof of Stake (DPoS):</strong> Token holders vote for representatives who validate transactions</li><li><strong>Practical Byzantine Fault Tolerance (PBFT):</strong> Nodes reach consensus through a voting system</li></ul>",
                order: 1
            },
            {
                lessonId: blockchainBasicsLessons[2].id,
                type: "VIDEO",
                content: "Understanding Blockchain Consensus Mechanisms",
                videoSrc: "https://www.youtube.com/embed/8uF7RVF2osk",
                order: 2
            },
            {
                lessonId: blockchainBasicsLessons[2].id,
                type: "PROJECT",
                content: "Compare and contrast two different consensus mechanisms, analyzing their strengths, weaknesses, and ideal use cases.",
                order: 3
            },
            {
                lessonId: blockchainBasicsLessons[2].id,
                type: "QUIZ",
                content: "Consensus Mechanisms Quiz",
                order: 4
            }
        ]).returning();
        
        console.log(`✅ Created ${consensusMechanismsMaterials.length} materials for 'Consensus Mechanisms' lesson`);
        
        // Create Module 1 Assessment
        const module1AssessmentMaterial = await db.insert(schema.materials).values([
            {
                lessonId: blockchainBasicsLessons[3].id,
                type: "QUIZ",
                content: "Blockchain Basics Module Assessment",
                order: 1
            }
        ]).returning();
        
        console.log(`✅ Created assessment for Blockchain Basics module`);
        
        // Create materials for "Introduction to Smart Contracts" lesson
        const introSmartContractsMaterials = await db.insert(schema.materials).values([
            {
                lessonId: smartContractsLessons[0].id,
                type: "READING",
                content: "<h1>Introduction to Smart Contracts</h1><p>Smart contracts are self-executing contracts with the terms directly written into code. They automatically enforce and execute the terms of an agreement when predetermined conditions are met.</p><p>Key features of smart contracts include:</p><ul><li><strong>Automation:</strong> Execute automatically when conditions are met</li><li><strong>Transparency:</strong> Visible to all participants on the blockchain</li><li><strong>Immutability:</strong> Cannot be changed once deployed</li><li><strong>Trustless:</strong> Don't require intermediaries or third parties</li></ul><p>Smart contracts are primarily used on blockchain platforms like Ethereum and have applications in finance, supply chain, real estate, and more.</p>",
                order: 1
            },
            {
                lessonId: smartContractsLessons[0].id,
                type: "VIDEO",
                content: "Smart Contracts Explained",
                videoSrc: "https://www.youtube.com/embed/ZE2HxTmxfrI",
                order: 2
            },
            {
                lessonId: smartContractsLessons[0].id,
                type: "QUIZ",
                content: "Smart Contracts Basics Quiz",
                order: 3
            }
        ]).returning();
        
        console.log(`✅ Created ${introSmartContractsMaterials.length} materials for 'Introduction to Smart Contracts' lesson`);
        
        // Create materials for "Smart Contract Languages" lesson
        const smartContractLanguagesMaterials = await db.insert(schema.materials).values([
            {
                lessonId: smartContractsLessons[1].id,
                type: "READING",
                content: "<h1>Smart Contract Programming Languages</h1><p>Several programming languages are used to write smart contracts, each with its own advantages and use cases:</p><ul><li><strong>Solidity:</strong> The most popular language for Ethereum smart contracts</li><li><strong>Vyper:</strong> A Python-like language focused on security and simplicity</li><li><strong>Rust:</strong> Used for Solana and other blockchain platforms</li><li><strong>Move:</strong> Developed for the Diem blockchain</li><li><strong>JavaScript:</strong> Used in some blockchain platforms through specialized frameworks</li></ul><p>The choice of language depends on the blockchain platform and specific requirements of the smart contract.</p>",
                order: 1
            },
            {
                lessonId: smartContractsLessons[1].id,
                type: "VIDEO",
                content: "Introduction to Solidity Programming",
                videoSrc: "https://www.youtube.com/embed/ipwxYa-F1uY",
                order: 2
            },
            {
                lessonId: smartContractsLessons[1].id,
                type: "ASSIGNMENT",
                content: "Research and compare two different smart contract languages. Identify their key features, advantages, and limitations.",
                order: 3
            },
            {
                lessonId: smartContractsLessons[1].id,
                type: "QUIZ",
                content: "Smart Contract Languages Quiz",
                order: 4
            },
            {
                lessonId: smartContractsLessons[1].id,
                type: "PROJECT",
                content: "Write a simple 'Hello World' smart contract in Solidity using an online IDE like Remix.",
                order: 5
            }
        ]).returning();
        
        console.log(`✅ Created ${smartContractLanguagesMaterials.length} materials for 'Smart Contract Languages' lesson`);
        
        // Create materials for "Building a Simple Smart Contract" lesson
        const buildingSmartContractMaterials = await db.insert(schema.materials).values([
            {
                lessonId: smartContractsLessons[2].id,
                type: "READING",
                content: "<h1>Building Your First Smart Contract</h1><p>In this lesson, we'll walk through creating a simple token contract in Solidity:</p><pre>// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract SimpleToken {\n    string public name = \"SimpleToken\";\n    string public symbol = \"ST\";\n    uint256 public totalSupply = 1000000;\n    mapping(address => uint256) public balanceOf;\n\n    constructor() {\n        balanceOf[msg.sender] = totalSupply;\n    }\n\n    function transfer(address to, uint256 amount) external returns (bool) {\n        require(balanceOf[msg.sender] >= amount, \"Not enough tokens\");\n        balanceOf[msg.sender] -= amount;\n        balanceOf[to] += amount;\n        return true;\n    }\n}</pre><p>This contract creates a simple token with a fixed supply and basic transfer functionality.</p>",
                order: 1
            },
            {
                lessonId: smartContractsLessons[2].id,
                type: "VIDEO",
                content: "Building and Deploying Your First Smart Contract",
                videoSrc: "https://www.youtube.com/embed/YJ-D1RMI0T0",
                order: 2
            },
            {
                lessonId: smartContractsLessons[2].id,
                type: "PROJECT",
                content: "Extend the SimpleToken contract by adding a function to allow an approved spender to transfer tokens on behalf of the owner.",
                order: 3
            },
            {
                lessonId: smartContractsLessons[2].id,
                type: "QUIZ",
                content: "Smart Contract Development Quiz",
                order: 4
            }
        ]).returning();
        
        console.log(`✅ Created ${buildingSmartContractMaterials.length} materials for 'Building a Simple Smart Contract' lesson`);
        
        // Create Module 2 Assessment
        const module2AssessmentMaterial = await db.insert(schema.materials).values([
            {
                lessonId: smartContractsLessons[3].id,
                type: "QUIZ",
                content: "Smart Contracts Module Assessment",
                order: 1
            }
        ]).returning();
        
        console.log(`✅ Created assessment for Smart Contracts module`);
        
        // Create questions for Module 1 Assessment
        const module1Questions = await db.insert(schema.questions).values([
            {
                materialId: module1AssessmentMaterial[0].id,
                content: "What is the primary purpose of blockchain technology?",
            },
            {
                materialId: module1AssessmentMaterial[0].id,
                content: "Which of the following is NOT a characteristic of blockchain?",
            },
            {
                materialId: module1AssessmentMaterial[0].id,
                content: "What cryptographic technique is used to link blocks in a blockchain?",
            },
            {
                materialId: module1AssessmentMaterial[0].id,
                content: "Which consensus mechanism is used by Bitcoin?",
            },
            {
                materialId: module1AssessmentMaterial[0].id,
                content: "What problem does the Byzantine Generals' Problem address in distributed systems?",
            }
        ]).returning();
        
        console.log(`✅ Created ${module1Questions.length} questions for Module 1 Assessment`);
        
        // Add answers for Module 1 Assessment questions
        await db.insert(schema.answers).values([
            // Question 1 answers
            {
                questionId: module1Questions[0].id,
                content: "What is the primary purpose of blockchain technology?",
                correct: true
            },
            {
                questionId: module1Questions[0].id,
                content: "To speed up database operations",
                correct: false
            },
            {
                questionId: module1Questions[0].id,
                content: "To centralize data storage for better security",
                correct: false
            },
            {
                questionId: module1Questions[0].id,
                content: "To reduce the cost of traditional database systems",
                correct: false
            },

            // Question 2 answers
            {
                questionId: module1Questions[1].id,
                content: "Centralized control",
                correct: true
            },
            {
                questionId: module1Questions[1].id,
                content: "Transparency",
                correct: false
            },
            {
                questionId: module1Questions[1].id,
                content: "Immutability",
                correct: false
            },
            {
                questionId: module1Questions[1].id,
                content: "Distributed ledger",
                correct: false
            },

            // Question 3 answers
            {
                questionId: module1Questions[2].id,
                content: "Hash functions",
                correct: true
            },
            {
                questionId: module1Questions[2].id,
                content: "Symmetric encryption",
                correct: false
            },
            {
                questionId: module1Questions[2].id,
                content: "Asymmetric encryption",
                correct: false
            },
            {
                questionId: module1Questions[2].id,
                content: "Digital signatures",
                correct: false
            },

            // Question 4 answers
            {
                questionId: module1Questions[3].id,
                content: "Proof of Work (PoW)",
                correct: true
            },
            {
                questionId: module1Questions[3].id,
                content: "Proof of Stake (PoS)",
                correct: false
            },
            {
                questionId: module1Questions[3].id,
                content: "Delegated Proof of Stake (DPoS)",
                correct: false
            },
            {
                questionId: module1Questions[3].id,
                content: "Practical Byzantine Fault Tolerance (PBFT)",
                correct: false
            },

            // Question 5 answers
            {
                questionId: module1Questions[4].id,
                content: "How to achieve consensus in a distributed system with potentially malicious actors",
                correct: true
            },
            {
                questionId: module1Questions[4].id,
                content: "How to optimize transaction speed in a blockchain",
                correct: false
            },
            {
                questionId: module1Questions[4].id,
                content: "How to secure private keys in a cryptocurrency wallet",
                correct: false
            },
            {
                questionId: module1Questions[4].id,
                content: "How to reduce energy consumption in mining operations",
                correct: false
            }
        ]);

        console.log("✅ Created answers for Module 1 Assessment questions");

        // Create questions for Module 2 Assessment
        const module2Questions = await db.insert(schema.questions).values([
            {
                materialId: module2AssessmentMaterial[0].id,
                content: "What is a smart contract?",
            },
            {
                materialId: module2AssessmentMaterial[0].id,
                content: "Which blockchain platform is most commonly associated with smart contracts?",
            },
            {
                materialId: module2AssessmentMaterial[0].id,
                content: "What programming language is most commonly used for Ethereum smart contracts?",
            },
            {
                materialId: module2AssessmentMaterial[0].id,
                content: "What is the main advantage of smart contracts over traditional contracts?",
            },
            {
                materialId: module2AssessmentMaterial[0].id,
                content: "What is 'gas' in the context of Ethereum smart contracts?",
            }
        ]).returning();

        console.log(`✅ Created ${module2Questions.length} questions for Module 2 Assessment`);

        // Add answers for Module 2 Assessment questions
        await db.insert(schema.answers).values([
            // Question 1 answers
            {
                questionId: module2Questions[0].id,
                content: "Self-executing code that automatically enforces the terms of an agreement",
                correct: true
            },
            {
                questionId: module2Questions[0].id,
                content: "A legal document signed by blockchain participants",
                correct: false
            },
            {
                questionId: module2Questions[0].id,
                content: "A physical contract stored on a blockchain",
                correct: false
            },
            {
                questionId: module2Questions[0].id,
                content: "A contract between miners and validators",
                correct: false
            },

            // Question 2 answers
            {
                questionId: module2Questions[1].id,
                content: "Ethereum",
                correct: true
            },
            {
                questionId: module2Questions[1].id,
                content: "Bitcoin",
                correct: false
            },
            {
                questionId: module2Questions[1].id,
                content: "Ripple",
                correct: false
            },
            {
                questionId: module2Questions[1].id,
                content: "Litecoin",
                correct: false
            },

            // Question 3 answers
            {
                questionId: module2Questions[2].id,
                content: "Solidity",
                correct: true
            },
            {
                questionId: module2Questions[2].id,
                content: "JavaScript",
                correct: false
            },
            {
                questionId: module2Questions[2].id,
                content: "Python",
                correct: false
            },
            {
                questionId: module2Questions[2].id,
                content: "C++",
                correct: false
            },

            // Question 4 answers
            {
                questionId: module2Questions[3].id,
                content: "Automatic execution without intermediaries",
                correct: true
            },
            {
                questionId: module2Questions[3].id,
                content: "Lower cost to create",
                correct: false
            },
            {
                questionId: module2Questions[3].id,
                content: "More legally binding",
                correct: false
            },
            {
                questionId: module2Questions[3].id,
                content: "Easier to modify after creation",
                correct: false
            },

            // Question 5 answers
            {
                questionId: module2Questions[4].id,
                content: "The fee paid to execute operations on the Ethereum network",
                correct: true
            },
            {
                questionId: module2Questions[4].id,
                content: "A type of cryptocurrency used to power smart contracts",
                correct: false
            },
            {
                questionId: module2Questions[4].id,
                content: "The energy consumed by Ethereum miners",
                correct: false
            },
            {
                questionId: module2Questions[4].id,
                content: "A measure of how complex a smart contract is",
                correct: false
            }
        ]);

        console.log("✅ Created answers for Module 2 Assessment questions");
        
        console.log("🌱 Seeding completed successfully!");
    } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();