import os
import json
import datetime
import re

def update_papers_md(new_papers):
    """更新 papers.md 文件"""
    md_path = 'papers.md'
    
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 根据论文类型插入到相应章节
    for paper in new_papers:
        paper_type = paper.get('type', 'Online RL')
        
        # 映射类型到章节标题
        section_map = {
            'Offline RL': '## 离线强化学习 (Offline RL)',
            'Online RL': '## 在线强化学习 (Online RL)',
            'Test-time RL': '## 测试时自适应 (Test-time RL)',
            'Survey': '## 综述论文'
        }
        
        section_title = section_map.get(paper_type, '## 在线强化学习 (Online RL)')
        
        # 构建Markdown条目
        entry = f"\n### {paper['title']} ({datetime.datetime.now().strftime('%Y.%m')})\n"
        entry += f"- **论文**: {paper['title']}\n"
        if 'authors' in paper:
            entry += f"- **作者**: {', '.join(paper['authors'])}\n"
        if 'venue' in paper:
            entry += f"- **会议**: {paper['venue']}\n"
        if 'url' in paper:
            entry += f"- **链接**: {paper['url']}\n"
        if 'summary' in paper:
            entry += f"- **核心贡献**: {paper['summary']}\n"
            
        # 插入到对应章节之后
        if section_title in content:
            parts = content.split(section_title)
            content = parts[0] + section_title + entry + parts[1]
        else:
            # 如果找不到章节，追加到末尾
            content += f"\n\n{section_title}\n{entry}"
            
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {md_path} with {len(new_papers)} new papers")

def update_web_data(new_papers):
    """更新 web/client/src/lib/data.ts 文件"""
    ts_path = 'web/client/src/lib/data.ts'
    
    if not os.path.exists(ts_path):
        print(f"Warning: {ts_path} not found")
        return

    with open(ts_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 提取现有的papers数组内容
    match = re.search(r'export const papers: Paper\[\] = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Could not find papers array in data.ts")
        return
        
    # 构建新的TS对象字符串
    new_entries = []
    for paper in new_papers:
        # 生成ID
        paper_id = paper.get('id', paper['title'].lower().replace(' ', '-').replace(':', ''))
        
        entry = "  {\n"
        entry += f"    id: '{paper_id}',\n"
        entry += f"    title: '{paper['title'].replace("'", "\\'")}',\n"
        entry += f"    authors: {json.dumps(paper.get('authors', ['Unknown']))},\n"
        entry += f"    date: '{datetime.datetime.now().strftime('%Y-%m-%d')}',\n"
        entry += f"    venue: '{paper.get('venue', 'ArXiv')}',\n"
        entry += f"    type: '{paper.get('type', 'Online RL')}',\n"
        entry += f"    url: '{paper.get('url', '')}',\n"
        entry += f"    summary: '{paper.get('summary', '').replace("'", "\\'")}',\n"
        entry += f"    tags: {json.dumps(paper.get('tags', ['New']))},\n"
        entry += f"    citations: 0\n"
        entry += "  }"
        new_entries.append(entry)
        
    # 插入新条目到数组开头
    insert_str = ",\n".join(new_entries)
    if insert_str:
        insert_str += ",\n"
        
    new_content = content.replace('export const papers: Paper[] = [', 'export const papers: Paper[] = [\n' + insert_str)
    
    # 更新统计数据
    # 简单增加总数
    new_content = re.sub(r'totalPapers: (\d+)', lambda m: f'totalPapers: {int(m.group(1)) + len(new_papers)}', new_content)
    
    with open(ts_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {ts_path} with {len(new_papers)} new papers")

def main():
    # 从环境变量获取输入数据
    input_data = os.environ.get('NEW_PAPERS_JSON')
    if not input_data:
        print("No input data provided")
        return
        
    try:
        new_papers = json.loads(input_data)
        if not isinstance(new_papers, list):
            new_papers = [new_papers]
            
        print(f"Processing {len(new_papers)} new papers...")
        
        update_papers_md(new_papers)
        update_web_data(new_papers)
        
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
    except Exception as e:
        print(f"Error updating files: {e}")

if __name__ == '__main__':
    main()
