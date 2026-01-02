# RL for VLA 论文资源列表

本文档整理了RL for VLA领域的重要论文，按训练范式分类。

## 离线强化学习 (Offline RL)

### Q-Transformer (2023.10)
- **论文**: Scalable Offline Reinforcement Learning via Autoregressive Q-Functions
- **机构**: Google DeepMind
- **链接**: https://q-transformer.github.io/
- **核心贡献**: 将Q-learning与Transformer架构结合，利用离线数据学习状态-动作价值函数

### π*0.6 / RECAP (2025.11)
- **论文**: A VLA that Learns from Experience
- **机构**: Physical Intelligence
- **链接**: https://www.physicalintelligence.company/blog/pistar06
- **核心贡献**: 结合专家演示、人工纠正和基于优势函数加权的策略学习，在真实世界复杂任务中表现卓越

### CO-RFT (2025.08)
- **论文**: Efficient Fine-tuning of VLA Models through Chunked Offline RL
- **ArXiv**: https://arxiv.org/abs/2508.02219
- **核心贡献**: 通过离线强化学习结合动作分块来高效微调VLA模型

## 在线强化学习 (Online RL)

### iRe-VLA (2025.01)
- **论文**: Improving Vision-Language-Action Model with Online Reinforcement Learning
- **ArXiv**: https://arxiv.org/abs/2501.16664
- **会议**: ICRA 2025
- **核心贡献**: 在强化学习和监督学习之间迭代，利用RL探索优势同时保持SFT稳定性

### VLA-RL (2025.05)
- **论文**: Towards Masterful and General Robotic Manipulation with Scalable Reinforcement Learning
- **ArXiv**: https://arxiv.org/abs/2505.18719
- **核心贡献**: 轨迹级RL公式，将机器人操作建模为多模态多轮对话，微调VLM作为奖励模型

### RLVLA (2025.05)
- **论文**: What Can RL Bring to VLA Generalization? An Empirical Study
- **ArXiv**: https://arxiv.org/abs/2505.19789
- **会议**: NeurIPS 2025
- **机构**: 清华大学、上海期智研究院、中关村研究院
- **项目**: https://rlvla.github.io/
- **核心贡献**: 全面实证研究PPO、GRPO、DPO在VLA微调中的效果，发现RL在执行维度提升显著

### SimpleVLA-RL (2025.09)
- **论文**: Scaling VLA Training via Reinforcement Learning
- **OpenReview**: https://openreview.net/forum?id=TQhSodCM4r
- **核心贡献**: 基于VeRL构建的RL框架，用于训练机器人操作任务的VLA模型

### VLA-RFT (2025.10)
- **论文**: Vision-Language-Action Reinforcement Fine-Tuning
- **OpenReview**: https://openreview.net/forum?id=Jaut99EHeu
- **核心贡献**: 利用数据驱动的世界模型作为可控模拟器的强化微调框架

### GR-RL (2025.12)
- **论文**: GR-RL Framework
- **机构**: ByteDance SEED
- **链接**: https://seed.bytedance.com/en/gr_rl
- **核心贡献**: 将通用VLA策略转变为高能力专家，首次实现真机强化学习穿鞋带

## 测试时自适应 (Test-time RL)

### V-GPS (2024.10)
- **核心贡献**: 利用预训练价值函数在测试时指导动作选择

### VLA-Reasoner (2025.09)
- **核心贡献**: 结合蒙特卡洛树搜索（MCTS）在推理时进行显式规划

### Hume (2025.06)
- **核心贡献**: 使用价值引导在测试时适应新任务

## 综述论文

### A Survey on Reinforcement Learning of Vision-Language-Action Models for Robotic Manipulation
- **作者**: Haoyuan Deng et al.
- **发布**: TechRxiv (2025.11)
- **链接**: https://doi.org/10.36227/techrxiv.176531955.54563920/v1
- **GitHub**: https://github.com/Denghaoyuan123/Awesome-RL-VLA
- **核心贡献**: 首个系统性综述RL-VLA的论文，提供全面的训练范式、方法论和最新进展

### 视觉–语言–动作模型综述: 从前史到前沿
- **作者**: 张慧等
- **期刊**: 自动化学报 (2025)
- **链接**: https://aas.net.cn/cn/article/doi/10.16383/j.aas.c250417
- **核心贡献**: 中文学术界对VLA模型的系统性综述

## 技术博客

### OpenVLA finetuning with online RL
- **作者**: Haonan Yu
- **链接**: https://www.haonanyu.blog/post/openvla_rl/
- **日期**: 2025年7月6日
- **核心内容**: 深入探讨OpenVLA模型RL微调的技术细节，包括批量动作预测、位置编码等实现问题

### Foundation Models for Robotics: VLA
- **作者**: Rohit Bandaru
- **链接**: https://rohitbandaru.github.io/blog/Foundation-Models-for-Robotics-VLA/
- **日期**: 2025年9月28日
- **核心内容**: 基础LLM如何适配机器人应用

## 开源资源

### OpenVLA
- **GitHub**: https://github.com/openvla/openvla
- **Hugging Face**: https://huggingface.co/openvla/openvla-7b
- **项目网站**: https://openvla.github.io/
- **描述**: 7B参数开源VLA模型，在970k机器人演示上预训练

### Awesome RL-VLA
- **GitHub**: https://github.com/Denghaoyuan123/Awesome-RL-VLA
- **Stars**: 387
- **描述**: RL-VLA论文和资源精选列表，包含50+篇论文的详细分类

### RL4VLA
- **GitHub**: https://github.com/gen-robot/RL4VLA
- **描述**: RLVLA实证研究的代码实现

## 更新日志

- 2026-01-02: 初始版本，收录50+篇论文和资源
