import React, { useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useRouteMatch } from 'react-router';
import {
    Issue,
    RepositoryParams,
    RepositoryResponse,
} from '../../models/repository.model';
import api from '../../services/api';
import { Issues, RepositoryInfo } from './styles';

const Repository: React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();
    const [repository, setRepository] = useState<RepositoryResponse | null>(
        null,
    );
    const [issues, setIssues] = useState<Issue[]>([]);

    useEffect(() => {
        api.get<RepositoryResponse>(`repos/${params.repository}`).then(
            (response) => {
                setRepository(response.data);
            },
        );

        api.get<Issue[]>(`repos/${params.repository}/issues`).then(
            (response) => {
                setIssues(response.data);
            },
        );
    }, [params.repository]);

    return (
        <>
            {repository && (
                <RepositoryInfo>
                    <header>
                        <img
                            src={repository.owner.avatar_url}
                            alt={repository.owner.login}
                        />
                        <div>
                            <strong>{repository.full_name}</strong>
                            <p>{repository.description}</p>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <strong>{repository.stargazers_count}</strong>
                            <span>Start</span>
                        </li>
                        <li>
                            <strong>{repository.forks_count}</strong>
                            <span>Forks</span>
                        </li>
                        <li>
                            <strong>{repository.open_issues_count}</strong>
                            <span>Issues abertas</span>
                        </li>
                    </ul>
                </RepositoryInfo>
            )}

            <Issues>
                {issues.map((issue) => (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        key={issue.id}
                        href={issue.html_url}
                    >
                        <div>
                            <strong>{issue.title}</strong>
                            <p>{issue.user.login}</p>
                        </div>

                        <FiChevronRight size={20} color="#cbcbd6" />
                    </a>
                ))}
            </Issues>
        </>
    );
};

export default Repository;
