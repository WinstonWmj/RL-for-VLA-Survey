# 强化学习赋能视觉-语言-动作模型(RL for VLA)技术综述

**作者**: Manus AI
**日期**: 2026年1月2日

## 摘要

视觉-语言-动作 (Vision-Language-Action, VLA) 模型作为具身智能的核心范式，正推动机器人及自动驾驶等领域向通用决策系统演进。然而，传统的监督微调 (Supervised Fine-Tuning, SFT) 方法严重依赖高质量的专家演示数据，且在面对分布外 (Out-of-Distribution, OOD) 场景时泛化能力有限，存在“复合错误”问题。强化学习 (Reinforcement Learning, RL) 通过与环境的交互探索和试错学习，为解决上述挑战提供了有效的途径。本综述旨在全面梳理将强化学习应用于VLA模型（RL for VLA）的最新研究进展，系统性地介绍其核心训练范式、关键技术方法、主要挑战与机遇，并对该领域未来的发展方向进行展望。

---

## 1. 引言

近年来，以大型语言模型 (LLM) 为代表的基础模型取得了巨大成功，其强大的语言理解、推理和生成能力激发了研究者将其扩展至物理世界的热情。VLA模型应运而生，它旨在统一处理视觉感知、语言指令和动作输出，使智能体能够理解人类意图并与物理世界进行交互 [1]。早期的VLA模型主要通过模仿学习 (Imitation Learning, IL)，特别是行为克隆 (Behavioral Cloning, BC) 的方式，在大量的专家演示数据上进行监督微调 [2]。

尽管SFT方法在许多任务上取得了令人印象深刻的成果，但其局限性也日益凸显。首先，高质量专家数据的获取成本高昂；其次，SFT训练的模型在遇到训练数据中未曾出现过的新场景时，容易产生微小误差，这些误差会随着时间累积，导致“复合错误” (Compounding Errors)，最终导致任务失败 [3]。

强化学习通过最大化累积奖励来学习最优策略，其核心优势在于能够通过自主探索发现超越专家演示的最优行为，并从成功或失败的经验中学习，从而提高模型的泛化能力和鲁棒性。因此，将RL与VLA相结合，已成为当前具身智能领域最活跃和最有前景的研究方向之一。

## 2. RL for VLA 的核心挑战

将强化学习直接应用于高维、复杂的VLA模型面临一系列独特的挑战：

| 挑战类别 | 具体描述 |
| :--- | :--- |
| **样本效率与探索** | 在真实物理世界中与环境交互的成本高昂且耗时，如何用有限的样本学习到有效的策略是核心难题。稀疏奖励问题（即只有在任务最终完成时才能获得奖励信号）进一步加剧了探索的难度。 |
| **训练稳定性** | 大型VLA模型参数量巨大，使用在线RL算法进行微调时，策略更新的方差很大，容易导致训练过程不稳定，甚至灾难性遗忘（Catastrophic Forgetting），即模型忘记了SFT阶段学到的知识。 |
| **信用分配** | 在一个长时序任务中，智能体执行了一系列动作后最终获得奖励或惩罚，如何准确地将结果归因于序列中的关键动作，是一个经典的信用分配难题。 |
| **奖励函数设计** | 设计一个能够准确反映任务目标且易于优化的奖励函数非常困难。手动设计的密集奖励函数需要大量领域知识，而从偏好数据或多模态反馈中学习奖励模型本身也是一个挑战。 |
| **Sim-to-Real Gap** | 虽然在模拟环境中训练可以大幅提高样本效率，但模拟器与真实世界之间的差异（即Sim-to-Real Gap）会导致在模拟器中训练好的策略在真实机器人上表现不佳。 |

## 3. RL for VLA 训练范式与关键技术

为了应对上述挑战，研究者们探索了多种RL训练范式。根据智能体与环境交互和利用数据的方式，我们可以将其分为三大类：离线RL、在线RL和测试时RL [4]。

### 3.1 离线强化学习 (Offline RL)

离线RL完全依赖于预先收集的静态数据集进行策略学习，无需与环境进行任何新的交互。这种范式非常适合于交互成本高昂或存在安全风险的场景。

> **核心思想**: 如何在不进行探索的情况下，从固定的数据集中安全地提取出最优策略，同时避免对数据集中未包含的“分布外”动作产生过高估值。

**代表性工作**:
- **Q-Transformer** [5]: 将Q-learning与Transformer架构结合，利用离线数据学习状态-动作价值函数。
- **π*0.6 (RECAP)** [3]: Physical Intelligence公司提出的方法，结合了专家演示、人工纠正和基于优势函数加权的策略学习，通过训练价值函数来解决信用分配问题，在真实世界的复杂任务中取得了卓越的性能。
- **CO-RFT** [6]: 通过离线强化学习结合动作分块（Action Chunking）来高效微调VLA模型，提高了训练的稳定性和效率。

### 3.2 在线强化学习 (Online RL)

在线RL允许智能体在训练过程中直接与环境交互，通过试错来收集新的经验数据，并实时更新策略。这是最经典的RL范式，能够实现策略的持续自我改进。

> **核心思想**: 如何在保证探索效率和训练稳定性的前提下，利用在线交互数据持续提升预训练VLA模型的性能。

**代表性工作**:
- **iRe-VLA** [7]: 提出在强化学习和监督学习之间进行迭代的框架，利用RL的探索优势，同时通过SFT来稳定训练过程，防止模型性能退化。
- **VLA-RL** [8]: 提出了一个系统的算法框架，引入轨迹级的RL公式，将机器人操作轨迹建模为多模态多轮对话，并微调VLM作为奖励模型以解决稀疏奖励问题。
- **RLVLA (Empirical Study)** [9]: 清华大学团队对PPO、GRPO、DPO等多种RL算法在VLA微调中的效果进行了全面的实证研究，发现在分布外泛化方面，RL在“执行”维度上提升显著，在“语义”维度上次之，在“视觉”维度上与SFT相当。
- **Haonan Yu's Blog Post** [10]: 深入探讨了将OpenVLA模型改造为“RL-ready”的技术细节，例如解决批量动作预测中因padding导致的位置编码问题，为工程实践提供了宝贵经验。

### 3.3 测试时自适应 (Test-time Adaptation)

测试时自适应是一种新兴的范式，它允许模型在部署（测试）阶段根据遇到的新情况进行轻量级的、无需更新模型主参数的快速调整。

> **核心思想**: 如何在不进行反向传播和梯度更新的情况下，利用推理时产生的信息（如价值函数、历史经验、规划结果）来动态调整模型的行为。

**代表性工作**:
- **V-GPS** [4]: 利用预训练的价值函数在测试时指导动作选择，从而提高决策质量。
- **VLA-Reasoner** [4]: 结合蒙特卡洛树搜索（MCTS）在推理时进行显式规划，以适应新任务。

下表总结了不同范式下的代表性方法及其特点：

| 范式 | 代表方法 | 核心技术 | 优点 | 缺点 |
| :--- | :--- | :--- | :--- | :--- |
| **离线RL** | π*0.6 (RECAP) | 价值函数学习、人工纠正 | 安全、无需在线交互 | 依赖数据集质量、无法探索新策略 |
| **在线RL** | VLA-RL, iRe-VLA | PPO/SAC算法、迭代训练 | 可持续自我改进、探索性强 | 样本效率低、训练不稳定、真实世界交互成本高 |
| **测试时自适应** | V-GPS, VLA-Reasoner | 价值引导、MCTS规划 | 部署时快速适应、无需重训 | 适应能力有限、推理开销大 |

## 4. 信息来源分析

本次调研发现，RL for VLA领域的信息高度集中在以下几类平台：

1.  **学术预印本网站 (ArXiv)**: 是该领域最新、最核心研究成果的首发地，超过70%的关键论文首先出现在ArXiv上。
2.  **开源平台 (GitHub & Hugging Face)**: GitHub上的`Awesome-RL-VLA` [4]等资源库提供了全面的论文列表和代码链接。Hugging Face则托管了大量的预训练VLA模型和相关数据集，构成了研究和应用的基础设施。
3.  **顶级会议 (NeurIPS, ICRA, ICLR等)**: 是经过同行评审的高质量研究的发布平台，相关论文通常可以在OpenReview等网站上找到评审过程。
4.  **企业与个人技术博客**: Physical Intelligence、ByteDance SEED以及Haonan Yu等研究者的个人博客，提供了宝贵的工业界实践经验和深入的技术实现细节。
5.  **中文社区 (知乎, CSDN)**: 是获取中文解读、综述和讨论的重要渠道，有助于快速理解领域动态，但原创性研究较少。
6.  **社交媒体 (Twitter/X)**: 是研究者发布和讨论最新工作的快速通道，适合跟踪领域热点。

## 5. 结论与展望

强化学习为解决VLA模型在泛化能力、鲁棒性和样本效率方面的瓶颈提供了强大的工具。当前的研究已经从不同角度探索了离线、在线和测试时自适应等多种技术路径，并在模拟和真实世界中展示了其巨大潜力。`iRe-VLA`的迭代学习思想、`VLA-RL`的系统化框架、`π*0.6`在真实场景的成功应用，以及`RLVLA`的全面实证分析，共同推动了该领域的快速发展。

未来，我们预测该领域将朝着以下方向发展：
- **混合范式**: 结合离线预训练、在线微调和测试时自适应的优点，形成更高效、更安全的数据利用闭环。
- **世界模型**: 将RL与世界模型 (World Models) 更紧密地结合，通过在学到的世界模型中进行规划和策略学习，大幅提升样本效率。
- **更强的基础模型**: 发展为RL优化的、更大规模、更多模态的VLA基础模型。
- **奖励函数自动化**: 研究如何从人类偏好、多模态反馈甚至自我生成的目标中自动学习奖励函数，摆脱手动设计的束缚。
- **软硬件协同设计**: 面向RL训练设计更高效的机器人硬件和模拟软件，加速从研究到应用的转化。

总而言之，RL for VLA正处在一个充满机遇和挑战的爆发前夜，它不仅是具身智能走向通用人工智能的关键一步，也必将对机器人、自动驾驶等相关产业产生深远影响。

---

## 参考文献

[1] Zhang, H., et al. (2025). *视觉–语言–动作模型综述: 从前史到前沿*. 自动化学报. [https://aas.net.cn/cn/article/doi/10.16383/j.aas.c250417](https://aas.net.cn/cn/article/doi/10.16383/j.aas.c250417)

[2] OpenVLA Team. (2024). *OpenVLA: An Open-Source Vision-Language-Action Model*. [https://openvla.github.io/](https://openvla.github.io/)

[3] Physical Intelligence. (2025). *A VLA that Learns from Experience*. [https://www.physicalintelligence.company/blog/pistar06](https://www.physicalintelligence.company/blog/pistar06)

[4] Deng, H., et al. (2025). *Awesome RL-VLA for Robotic Manipulation*. GitHub Repository. [https://github.com/Denghaoyuan123/Awesome-RL-VLA](https://github.com/Denghaoyuan123/Awesome-RL-VLA)

[5] Google DeepMind. (2023). *Q-Transformer: Scalable Offline Reinforcement Learning via Autoregressive Q-Functions*. [https://q-transformer.github.io/](https://q-transformer.github.io/)

[6] Anonymous. (2025). *Co-RFT: Efficient Fine-tuning of VLA Models through Chunked Offline RL*. arXiv. [https://arxiv.org/abs/2508.02219](https://arxiv.org/abs/2508.02219)

[7] Guo, Y., et al. (2025). *Improving Vision-Language-Action Model with Online Reinforcement Learning*. arXiv. [https://arxiv.org/abs/2501.16664](https://arxiv.org/abs/2501.16664)

[8] Lu, G., et al. (2025). *VLA-RL: Towards Masterful and General Robotic Manipulation with Scalable Reinforcement Learning*. arXiv. [https://arxiv.org/abs/2505.18719](https://arxiv.org/abs/2505.18719)

[9] Liu, J., et al. (2025). *What Can RL Bring to VLA Generalization? An Empirical Study*. [https://rlvla.github.io/](https://rlvla.github.io/)

[10] Yu, H. (2025). *OpenVLA finetuning with online RL*. Haonan's blog. [https://www.haonanyu.blog/post/openvla_rl/](https://www.haonanyu.blog/post/openvla_rl/)
